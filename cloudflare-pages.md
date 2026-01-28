# Cloudflare Pages Deployment Configuration

## Build Settings

When configuring your Cloudflare Pages project, use these settings:

- **Build command**: `hugo --minify`
- **Output directory**: `public`
- **Root directory**: `/` (root of repository)
- **Hugo version**: Cloudflare Pages will auto-detect, but you can specify `0.147.7` or later

## Environment Variables (Optional)

You can set these in Cloudflare Pages dashboard if needed:
- `HUGO_VERSION`: `0.147.7` (or latest)
- `NODE_VERSION`: Not required for Hugo

## Build Process

1. Cloudflare Pages will run `hugo --minify`
2. Hugo will generate the site in the `public` directory
3. Static files from `static/` will be automatically copied to `public/`
4. The `public` directory will be deployed

## Notes

- The site is configured to ignore raw HTML warnings (for contact form)
- Taxonomy pages (tags, categories) are now properly configured
- All logo images are in `static/images/` and will be copied automatically
