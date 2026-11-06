export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    rating?: number;
    image?: string;
    reviews?: number;
    category: string;
    brand: string;
    inStock: boolean;
    hoverImage?: string;
    badge?: 'Best Seller' | 'Thin Stock';
    specifications?: { [key: string]: string };
    detailedReviews?: {
        id: number;
        author: string;
        rating: number;
        comment: string;
        photo?: string;
        date: string;
    }[];
}

export const initialProducts: Product[] = [
    {
        id: 1,
        title: "NVIDIA RTX 4090",
        price: 1599,
        description: "Ultimate graphics card for 8K gaming and professional creative workflows. Features 24GB G6X memory and advanced ray tracing capabilities.",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1624701928517-44c8ac49d93c?w=800&q=80",
        reviews: 245,
        category: "graphics",
        brand: "NVIDIA",
        inStock: true,
        hoverImage: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800&q=80",
        badge: "Best Seller",
        detailedReviews: [
            { id: 1, author: "Alex R.", rating: 5, comment: "Absolute beast of a GPU! Handles 4K gaming like a breeze. The cooling is surprisingly quiet for such a powerful card.", photo: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop", date: "2024-02-15" },
            { id: 2, author: "James W.", rating: 5, comment: "Expensive but worth every penny for professional rendering work.", date: "2024-02-20" }
        ]
    },
    {
        id: 2,
        title: "Samsung 980 Pro SSD 2TB",
        price: 189,
        description: "Ultra-fast NVMe SSD with PCIe 4.0 interface and sequential read speeds up to 7,000 MB/s. Perfect for rapid game loading.",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1628557044797-f21a177c37ec?w=800&q=80",
        reviews: 189,
        category: "storage",
        brand: "Samsung",
        inStock: true,
        hoverImage: "https://images.unsplash.com/photo-1583424168051-5121b6559385?w=800&q=80",
        badge: "Best Seller",
        detailedReviews: [
            { id: 1, author: "Kevin M.", rating: 5, comment: "Load times are non-existent now. Best upgrade I've made in years.", photo: "https://images.unsplash.com/photo-1542393545-10f5cde2c810?w=100&h=100&fit=crop", date: "2024-03-05" }
        ]
    },
    {
        id: 3,
        title: "Corsair Vengeance RGB 32GB",
        price: 149,
        description: "High-performance DDR4 3200MHz RAM with dynamic multi-zone RGB lighting. Optimized for Intel and AMD motherboards.",
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1562976540-1502c2145186?w=800&q=80",
        reviews: 156,
        category: "memory",
        brand: "Corsair",
        inStock: true,
        hoverImage: "https://images.unsplash.com/photo-1541029071515-84cc54f84dc5?w=800&q=80",
        detailedReviews: [
            { id: 1, author: "Chris L.", rating: 4, comment: "Looks amazing in my build. Software control is a bit clunky but manageable.", photo: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop", date: "2024-01-12" }
        ]
    },
    {
        id: 4,
        title: "AMD Radeon RX 7900",
        price: 899,
        description: "High-performance 4K gaming graphics card with RDNA 3 architecture and 20GB memory. Ideal for high-refresh-rate gaming.",
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1618424181497-157f25b6ddd5?w=800&q=80",
        reviews: 203,
        category: "graphics",
        brand: "AMD",
        inStock: true,
        hoverImage: "https://images.unsplash.com/photo-1555617766-c94804975da3?w=800&q=80",
        badge: "Thin Stock",
        detailedReviews: [
            { id: 1, author: "Mark T.", rating: 5, comment: "Incredible value compared to the green team. Rasterization performance is top-tier.", date: "2024-02-28" }
        ]
    },
    {
        id: 5,
        title: "Intel Core i9-13900K",
        price: 599,
        description: "Ultimate desktop processor with 24 cores and 5.8 GHz peak frequency. Designed for hybrid architecture performance.",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800&q=80",
        reviews: 178,
        category: "processor",
        brand: "Intel",
        inStock: true,
        hoverImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80",
        badge: "Best Seller",
        detailedReviews: [
            { id: 1, author: "Dave S.", rating: 5, comment: "A multitasking monster. Perfect for video editing and streaming.", photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop", date: "2024-03-10" }
        ]
    },
    {
        id: 6,
        title: "ASUS ROG Strix X670E",
        price: 449,
        description: "Premium motherboard for AMD Ryzen 7000 series. Features WiFi 6E, PCIE 5.0, and robust power delivery for overclocking.",
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1563920443-b0e194943339?w=800&q=80",
        reviews: 128,
        category: "motherboard",
        brand: "ASUS",
        inStock: true,
        hoverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
        detailedReviews: [
            { id: 1, author: "Liam O.", rating: 4, comment: "Feature set is unbeatable, but the price is a bit steep.", date: "2024-02-05" }
        ]
    },
    {
        id: 7,
        title: "NZXT H7 Flow ATX Mid Tower",
        price: 129,
        description: "Modern ATX mid-tower case designed for high-performance cooling. Features a perforated top panel and tool-less tempered glass.",
        rating: 4.4,
        image: "https://images.unsplash.com/photo-1587202372775-fd82d4c8b1b4?w=800&q=80",
        reviews: 97,
        category: "case",
        brand: "NZXT",
        inStock: true,
        hoverImage: "https://images.unsplash.com/photo-1591405351990-4726e331f141?w=800&q=80",
        badge: "Best Seller",
        detailedReviews: [
            { id: 1, author: "Ben J.", rating: 5, comment: "Easiest case I've ever built in. Cable management is elite.", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop", date: "2024-01-25" }
        ]
    },
    {
        id: 8,
        title: "Western Digital Blue 4TB",
        price: 89,
        description: "Reliable 3.5-inch internal hard drive for everyday computing. High-capacity storage for media, files, and backups.",
        rating: 4.3,
        image: "https://images.unsplash.com/photo-1537589574421-12c8e8334460?w=800&q=80",
        reviews: 145,
        category: "storage",
        brand: "Western Digital",
        inStock: true,
        hoverImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc48?w=800&q=80",
        badge: "Thin Stock",
        detailedReviews: [
            { id: 1, author: "Sarah K.", rating: 4, comment: "Great for bulk storage. Quiet and reliable so far.", photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop", date: "2024-03-01" }
        ]
    }
];


// Helper functions to manage mock data in localStorage
export const getProducts = (): Product[] => {
    if (typeof window === 'undefined') return initialProducts;
    const stored = localStorage.getItem('products');
    if (stored) {
        let products = JSON.parse(stored);
        let hasChanges = false;

        // Check for missing initial products or missing fields on existing products
        initialProducts.forEach(initial => {
            const index = products.findIndex((p: Product) => p.id === initial.id);
            if (index === -1) {
                // Entirely missing default product, add it
                products.push(initial);
                hasChanges = true;
            } else {
                // Default product exists, check for missing features (badges, detailed reviews, IMAGES)
                const current = products[index];
                let productUpdated = false;

                if (!current.badge && initial.badge) {
                    current.badge = initial.badge;
                    productUpdated = true;
                }
                if ((!current.detailedReviews || current.detailedReviews.length === 0) && initial.detailedReviews) {
                    current.detailedReviews = initial.detailedReviews;
                    productUpdated = true;
                }
                if (!current.image && initial.image) {
                    current.image = initial.image;
                    productUpdated = true;
                }
                if (!current.hoverImage && initial.hoverImage) {
                    current.hoverImage = initial.hoverImage;
                    productUpdated = true;
                }

                if (productUpdated) {
                    products[index] = current;
                    hasChanges = true;
                }
            }
        });

        if (hasChanges) {
            localStorage.setItem('products', JSON.stringify(products));
        }
        return products;
    }
    localStorage.setItem('products', JSON.stringify(initialProducts));
    return initialProducts;
};

export const saveProducts = (products: Product[]) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('products', JSON.stringify(products));
    }
};

export const getOrders = () => {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem('orders');
    if (stored) return JSON.parse(stored);

    // Mock some initial orders
    const initialOrders = [
        { id: 'ORD-001', customer: 'John Doe', total: 1599, status: 'Delivered', date: new Date(Date.now() - 86400000 * 2).toISOString().split('T')[0] },
        { id: 'ORD-002', customer: 'Jane Smith', total: 338, status: 'Processing', date: new Date().toISOString().split('T')[0] }
    ];
    localStorage.setItem('orders', JSON.stringify(initialOrders));
    return initialOrders;
};

export const saveOrders = (orders: any[]) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('orders', JSON.stringify(orders));
    }
};

export const getUsers = () => {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem('users');
    if (stored) {
        const users = JSON.parse(stored);
        // Ensure there's an admin if not present
        if (!users.find((u: any) => u.role === 'admin')) {
            const adminObj = {
                id: 'admin-1',
                firstName: 'Admin',
                lastName: 'User',
                email: 'admin@example.com',
                password: 'password123',
                role: 'admin',
                createdAt: new Date().toISOString()
            };
            users.push(adminObj);
            localStorage.setItem('users', JSON.stringify(users));
        }
        return users;
    }

    // Return default admin
    const defaultAdmin = [{
        id: 'admin-1',
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@example.com',
        password: 'password123', // Demo password
        role: 'admin',
        createdAt: new Date().toISOString()
    }];
    localStorage.setItem('users', JSON.stringify(defaultAdmin));
    return defaultAdmin;
};
