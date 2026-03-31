# Gemfile — Dependencias de Jekyll para Grupo Scout Nyeri
# Usar github-pages para compatibilidad total con GitHub Pages

source "https://rubygems.org"

# Plataforma GitHub Pages (incluye Jekyll y plugins oficiales)
gem "github-pages", group: :jekyll_plugins

# Plugins incluidosen github-pages
group :jekyll_plugins do
  gem "jekyll-seo-tag"
  gem "jekyll-feed"
  gem "jekyll-sitemap"
end

# Dependencias de Windows (ignoradas en Linux/Mac)
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

gem "webrick"
gem "wdm", "~> 0.1", platforms: [:mingw, :x64_mingw, :mswin]
gem "http_parser.rb", "~> 0.6.0", platforms: :jruby
