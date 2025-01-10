# Create directories
New-Item -ItemType Directory -Force -Path "banners"
New-Item -ItemType Directory -Force -Path "categories"
New-Item -ItemType Directory -Force -Path "products"

# Banner images
$bannerUrls = @(
    "https://images.unsplash.com/photo-1593642532744-d377ab507dc8?w=1600", # Premium Electronics
    "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1600", # Luxury Fashion
    "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1600"  # Home Decor
)

# Category images
$categoryUrls = @(
    "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800", # Electronics
    "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800", # Fashion
    "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800", # Home
    "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800"  # Beauty
)

# Product images
$productUrls = @(
    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800", # MacBook Pro
    "https://images.unsplash.com/photo-1601944179066-29786cb9d32a?w=800", # Samsung TV
    "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800", # Leather Bag
    "https://images.unsplash.com/photo-1606937457831-ed9d5631de33?w=800", # Coffee Maker
    "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800", # Sony Headphones
    "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800"    # iPad Pro
)

# Download banner images
for ($i = 0; $i -lt $bannerUrls.Count; $i++) {
    $url = $bannerUrls[$i]
    $filename = "banners/banner$($i+1).jpg"
    Invoke-WebRequest -Uri $url -OutFile $filename
}

# Download category images
for ($i = 0; $i -lt $categoryUrls.Count; $i++) {
    $url = $categoryUrls[$i]
    $filename = "categories/category$($i+1).jpg"
    Invoke-WebRequest -Uri $url -OutFile $filename
}

# Download product images
for ($i = 0; $i -lt $productUrls.Count; $i++) {
    $url = $productUrls[$i]
    $filename = "products/product$($i+1).jpg"
    Invoke-WebRequest -Uri $url -OutFile $filename
}
