/**
 * Generate a Claude-written article and publish it to Shopify.
 * Run: SHOPIFY_ADMIN_TOKEN=shpat_xxx ANTHROPIC_API_KEY=sk-ant-xxx node scripts/generate-article.mjs "topic here"
 */

import Anthropic from '@anthropic-ai/sdk'

const STORE = '0fbb86-09.myshopify.com'
const SHOPIFY_TOKEN = process.env.SHOPIFY_ADMIN_TOKEN
const topic = process.argv[2]

if (!process.env.ANTHROPIC_API_KEY) { console.error('Missing ANTHROPIC_API_KEY'); process.exit(1) }
if (!SHOPIFY_TOKEN) { console.error('Missing SHOPIFY_ADMIN_TOKEN'); process.exit(1) }
if (!topic) { console.error('Usage: node scripts/generate-article.mjs "topic here"'); process.exit(1) }

const BASE = `https://${STORE}/admin/api/2024-10`
const SHOPIFY_HEADERS = {
  'Content-Type': 'application/json',
  'X-Shopify-Access-Token': SHOPIFY_TOKEN,
}

const GRAPHQL_URL = `https://${STORE}/admin/api/2025-01/graphql.json`

const CREATE_ARTICLE = `
  mutation CreateArticle($article: ArticleCreateInput!) {
    articleCreate(article: $article) {
      article {
        id
        title
        handle
        body
      }
      userErrors { code field message }
    }
  }
`

async function shopifyRest(path) {
  const res = await fetch(`${BASE}${path}`, { headers: SHOPIFY_HEADERS })
  return res.json()
}

async function shopifyPost(path, body) {
  const res = await fetch(`${BASE}${path}`, {
    method: 'POST',
    headers: SHOPIFY_HEADERS,
    body: JSON.stringify(body),
  })
  return res.json()
}

async function shopifyGraphQL(query, variables = {}) {
  const res = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers: SHOPIFY_HEADERS,
    body: JSON.stringify({ query, variables }),
  })
  const json = await res.json()
  if (json.errors) throw new Error(JSON.stringify(json.errors))
  return json.data
}

async function getOrCreateBlog() {
  const { blogs } = await shopifyRest('/blogs.json')
  let blog = blogs.find(b => b.handle === 'news')

  if (!blog) {
    console.log('Creating blog "News"...')
    const created = await shopifyPost('/blogs.json', { blog: { title: 'News' } })
    blog = created.blog
    console.log(`Created blog: ${blog.title} (id: ${blog.id})`)
  } else {
    console.log(`Found blog: ${blog.title} (id: ${blog.id})`)
  }

  return blog
}

// Stable system prompt — cached after first request
const SYSTEM_PROMPT = `You are JON Editorial — the content voice for JON (Just One Nation), an Indonesian streetwear brand based in Jakarta. Your writing is grounded, direct, and rooted in Jakarta street culture. You write for people who move through the city: commuters, market vendors, Kemang regulars, Yogyakarta craft lovers.

Style rules:
- No fluff, no corporate language
- First-person plural ("we") for brand perspective
- Reference real Indonesian places and culture (Blok M, ojek, Pasar, SBUs, etc.)
- Technical when discussing fabric or construction — specific numbers, not vague claims
- Stories over product descriptions
- Short paragraphs; use <h2> subheadings to break up long sections

Output ONLY valid JSON. No markdown fences. No explanation before or after. Exact format:
{
  "title": "Article title (compelling, specific, max 80 chars)",
  "summary": "1-2 sentence preview shown on the blog index.",
  "body_html": "Full article HTML using <p>, <h2>, <em> tags. Minimum 400 words.",
  "tags": ["tag1", "tag2", "tag3"]
}`

async function generateArticle(topic) {
  const client = new Anthropic()

  console.log(`\nGenerating article: "${topic}"...`)

  const response = await client.messages.create({
    model: 'claude-opus-4-7',
    max_tokens: 4096,
    thinking: { type: 'adaptive' },
    system: [
      {
        type: 'text',
        text: SYSTEM_PROMPT,
        cache_control: { type: 'ephemeral' },
      },
    ],
    messages: [
      {
        role: 'user',
        content: `Write a JON blog article about: ${topic}`,
      },
    ],
  })

  const cacheWrite = response.usage.cache_creation_input_tokens ?? 0
  const cacheRead = response.usage.cache_read_input_tokens ?? 0
  console.log(`Tokens — input: ${response.usage.input_tokens}, cache_write: ${cacheWrite}, cache_read: ${cacheRead}, output: ${response.usage.output_tokens}`)

  const textBlock = response.content.find(b => b.type === 'text')
  if (!textBlock) throw new Error('No text block in Claude response')

  return JSON.parse(textBlock.text)
}

async function publishArticle(blogGid, article) {
  const data = await shopifyGraphQL(CREATE_ARTICLE, {
    article: {
      blogId: blogGid,
      title: article.title,
      body: article.body_html,
      summary: article.summary,
      tags: article.tags,
      author: { name: 'JON Editorial' },
      isPublished: true,
    },
  })

  const { userErrors, article: created } = data.articleCreate
  if (userErrors.length) throw new Error(JSON.stringify(userErrors))
  return created
}

async function run() {
  const blog = await getOrCreateBlog()

  // GraphQL needs the GID format: "gid://shopify/Blog/12345"
  const blogGid = `gid://shopify/Blog/${blog.id}`

  const article = await generateArticle(topic)
  console.log(`\nTitle:   ${article.title}`)
  console.log(`Summary: ${article.summary}`)
  console.log(`Tags:    ${article.tags.join(', ')}`)

  const published = await publishArticle(blogGid, article)
  console.log(`\n✓ Published → /blogs/news/${published.handle}`)
  console.log(`  GID: ${published.id}`)
}

run().catch(err => {
  console.error('\nError:', err.message)
  process.exit(1)
})
