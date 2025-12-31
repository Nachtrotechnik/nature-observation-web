// API Configuration
// Centralized configuration for API endpoints

const API_CONFIG = {
    baseURL: 'http://localhost:3000',
    endpoints: {
        observations: {
            getAll: '/observations',
            getOne: (id) => `/observation/${id}`,
            create: '/observation',
            delete: (id) => `/observation/${id}`,
            export: '/export'
        }
    },
    // External APIs
    external: {
        iNaturalist: {
            baseURL: 'https://api.inaturalist.org/v1/observations'
        }
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = API_CONFIG;
}
