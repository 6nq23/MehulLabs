/** Published blog posts, read lazily so the post layout can list siblings without a circular import. */
export interface BlogFrontmatter {
  title: string;
  description: string;
  publishedOn: string;
  updatedOn?: string;
  category?: string;
  author?: string;
  readTime?: string;
  coverImage?: string;
  coverImageAlt?: string;
  draft?: boolean;
}

export interface BlogPost {
  url: string;
  slug: string;
  frontmatter: BlogFrontmatter;
}

interface BlogModule {
  url?: string;
  file: string;
  frontmatter: BlogFrontmatter;
}

const modules = import.meta.glob<BlogModule>('../pages/blog/*.md');

export async function getPosts(): Promise<BlogPost[]> {
  const loaded = await Promise.all(Object.values(modules).map(load => load()));
  return loaded
    .filter(post => !post.frontmatter.draft)
    .map(post => {
      const slug = post.file.replace(/\\/g, '/').split('/').pop()!.replace(/\.md$/, '');
      return { url: post.url || `/blog/${slug}`, slug, frontmatter: post.frontmatter };
    })
    .sort((a, b) => Date.parse(b.frontmatter.publishedOn) - Date.parse(a.frontmatter.publishedOn));
}

/** Words a reader sees in a Markdown post: frontmatter, HTML tags, link targets and table rules removed. */
export function readingStats(markdown: string) {
  const body = markdown
    .replace(/^---\r?\n[\s\S]*?\r?\n---/, '')
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[#>*_`|~-]+/g, ' ');
  const words = body.match(/[\p{L}\p{N}][\p{L}\p{N}'’.]*/gu)?.length ?? 0;
  return { words, readTime: `${Math.max(1, Math.round(words / 230))} min read` };
}

const stopWords = new Set(['the', 'and', 'for', 'your', 'with', 'what', 'how', 'guide', 'shopify', '2026', 'before', 'from', 'that', 'this', 'are', 'can', 'not', 'practical', 'ecommerce', 'd2c', 'store', 'stores', 'brands', 'complete', 'plan', 'checklist', 'without', 'need']);
const terms = (text: string) => new Set(text.toLowerCase().split(/[^a-z0-9]+/).filter(word => word.length > 2 && !stopWords.has(word)));

/** Same-category posts first, then posts sharing title words, then the newest. */
export async function getRelatedPosts(currentUrl: string, category: string | undefined, title: string, limit = 3): Promise<BlogPost[]> {
  const own = terms(title);
  const scored = (await getPosts())
    .filter(post => post.url !== currentUrl)
    .map((post, index) => {
      const shared = [...terms(post.frontmatter.title)].filter(word => own.has(word)).length;
      const sameCategory = category && post.frontmatter.category === category ? 3 : 0;
      return { post, score: sameCategory + shared * 2 - index * 0.01 };
    })
    .sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map(item => item.post);
}
