/**
 * Seeds 5 mock blog articles into Shopify.
 * Run: SHOPIFY_ADMIN_TOKEN=shpat_xxx node scripts/seed-blog.mjs
 */

const STORE = '0fbb86-09.myshopify.com'
const TOKEN = process.env.SHOPIFY_ADMIN_TOKEN

if (!TOKEN) {
  console.error('Missing SHOPIFY_ADMIN_TOKEN env var.')
  process.exit(1)
}

const BASE = `https://${STORE}/admin/api/2024-10`
const headers = {
  'Content-Type': 'application/json',
  'X-Shopify-Access-Token': TOKEN,
}

async function adminGet(path) {
  const res = await fetch(`${BASE}${path}`, { headers })
  return res.json()
}

async function adminPost(path, body) {
  const res = await fetch(`${BASE}${path}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  })
  return res.json()
}

// --- Mock articles (JON — Jakarta streetwear brand) ---
const ARTICLES = [
  {
    title: 'How Jakarta Street Culture Shapes Every JON Drop',
    author: 'JON Editorial',
    summary_html: 'From Blok M to Sudirman — the streets talk, and we listen. A look at the city energy behind our SS25 collection.',
    body_html: `
      <p>Jakarta moves fast. The streets at 2 AM in Blok M carry a different energy than Sudirman at noon — and both end up in our designs. JON isn't built in a vacuum. It's built on commutes, conversations, and the chaos of a city that never fully stops.</p>
      <h2>The Blueprint</h2>
      <p>When we started sketching SS25, we didn't start with trend reports. We started with a month of riding <em>ojek</em> across all six of Jakarta's SBUs, watching how people dress when nobody's watching. The result: cuts designed for motion, fabrics that breathe in humidity, and colorways pulled directly from the city's aging concrete and neon signage.</p>
      <h2>One Nation, Many Streets</h2>
      <p>JON stands for Just One Nation — but that nation contains multitudes. Pasar minggu vendors, Kemang regulars, Tanah Abang wholesalers. Our clothes need to work across all of them. That tension is intentional. It's what makes the collection honest.</p>
    `,
    published: true,
  },
  {
    title: 'Breaking Down the SS25 Fabric Choice',
    author: 'JON Editorial',
    summary_html: 'Why we moved away from 100% cotton for our Spring/Summer 2025 run — and what we replaced it with.',
    body_html: `
      <p>Cotton is comfortable. Cotton is also a liability in a city where 85% humidity is a mild day. For SS25 we made a call: shift our core tees to a 60/40 cotton-modal blend that holds shape, wicks moisture, and still feels like a second skin after 12 hours of wear.</p>
      <h2>The Trade-offs We Accepted</h2>
      <p>Modal costs more. We absorbed the margin hit rather than raise prices — for now. The feedback from our pre-launch sample run was unanimous: once you feel the difference, there's no going back. Durability tests put the new blend at roughly 40% more resistant to pilling after 50 washes versus the previous construction.</p>
      <h2>What This Means for Future Drops</h2>
      <p>We're not locking into one material forever. Each collection gets evaluated on its own terms. But the SS25 data will heavily influence FW25 decisions. If the market responds the way we think it will, you'll see modal become a JON staple.</p>
    `,
    published: true,
  },
  {
    title: 'The Making of the JON Logo: A Three-Year Story',
    author: 'JON Editorial',
    summary_html: "Our wordmark went through 47 iterations. Here's what the final version means and why the earlier ones didn't make it.",
    body_html: `
      <p>The JON wordmark looks simple. That simplicity cost three years and 47 rejected versions to achieve.</p>
      <h2>What We Were Trying to Say</h2>
      <p>Early concepts leaned hard into aggressive streetwear typography — sharp angles, condensed all-caps, the kind of lettering you'd see on skate decks from 2008. They communicated attitude but not longevity. We weren't building for a moment. We were building a mark that should still feel right in twenty years.</p>
      <h2>The Shift</h2>
      <p>Around iteration 23, our creative director made one instruction: <em>make it quieter</em>. Strip everything down until what's left can't be removed without breaking it. The current mark is geometric but warm — the letterforms borrow proportions from classic Indonesian craft motifs without being decorative. It's a background mark. It lets the clothes speak.</p>
      <h2>Where You'll See It</h2>
      <p>Embroidered, screen-printed, debossed on accessories. We don't use it the same way twice because context changes meaning. A 2cm chest hit reads differently than a full-back print — and we want both readings to be intentional.</p>
    `,
    published: true,
  },
  {
    title: 'Community First: The Story Behind Our Pop-Up Series',
    author: 'JON Editorial',
    summary_html: "We've run 11 pop-ups in 8 cities since 2023. What we've learned, what we'd do differently, and where we're going next.",
    body_html: `
      <p>We ran our first pop-up out of a borrowed space in Kemang with Rp 2 juta in pocket and no PR budget. Two hundred people showed up. We've been chasing that energy ever since.</p>
      <h2>Why Pop-ups Still Matter</h2>
      <p>E-commerce gives you scale. Pop-ups give you signal. When you watch someone pick up a piece, hold it, feel the weight, and make a decision in real time — that's data no analytics dashboard can replicate. We've changed cut decisions, adjusted sizing runs, and scrapped colorways entirely based on pop-up feedback.</p>
      <h2>The Cities</h2>
      <p>Jakarta, Bandung, Surabaya, Yogyakarta, Bali, Medan, Makassar, Malang. Each city has its own taste profile. Yogyakarta buys differently than Surabaya — slower, more deliberate, with more attention to material story. Bali moves volume on graphics. Knowing this shapes how we curate each stop.</p>
      <h2>What's Next</h2>
      <p>We're not announcing dates yet. But we're going back to Bandung in Q3, and there's a first-time city on the list that's been requested more than anywhere else. Sign up to the newsletter. You'll hear it first.</p>
    `,
    published: true,
  },
  {
    title: 'Sizing at JON: Why We Run Slightly Oversized and How to Find Your Fit',
    author: 'JON Editorial',
    summary_html: 'A practical guide to JON sizing — our philosophy, how it compares to standard Indonesian sizing, and how to measure yourself.',
    body_html: `
      <p>JON runs with a slight oversize bias. This is intentional, not an oversight. Here's the full reasoning and what it means for how you should order.</p>
      <h2>The Design Philosophy</h2>
      <p>We design for layering and movement — not fitted silhouettes. Our proportions are calibrated so that a garment sits comfortably off the shoulder, allows unrestricted arm movement, and maintains visual weight when worn with baggy bottoms or tucked with slim fits. If you want a closer fit, size down once.</p>
      <h2>How We Measure</h2>
      <p>All our measurements are taken flat — lay the garment on a surface, measure half the chest width and double it. Every product page has a spec table. We recommend measuring a garment you already own and love, then comparing against ours rather than going by S/M/L alone.</p>
      <h2>Regional Note</h2>
      <p>Standard Indonesian sizing in fast fashion tends to run small. JON sizing is closer to Japanese streetwear sizing — our M is roughly equivalent to an L in many local brands. When in doubt, contact us on WhatsApp before ordering. We'd rather help you get the right size than process a return.</p>
    `,
    published: true,
  },
]

async function run() {
  // Find or create the "news" blog
  const { blogs } = await adminGet('/blogs.json')
  let blog = blogs.find(b => b.handle === 'news')

  if (!blog) {
    console.log('Blog "news" not found — creating...')
    const created = await adminPost('/blogs.json', { blog: { title: 'News' } })
    blog = created.blog
    console.log(`Created blog: ${blog.title} (id: ${blog.id})`)
  } else {
    console.log(`Found blog: ${blog.title} (id: ${blog.id})`)
  }

  for (const article of ARTICLES) {
    const res = await adminPost(`/blogs/${blog.id}/articles.json`, { article })
    if (res.article) {
      console.log(`✓ Created: "${res.article.title}" → /blog/${res.article.handle}`)
    } else {
      console.error(`✗ Failed:`, res)
    }
  }

  console.log('\nDone.')
}

run().catch(console.error)
