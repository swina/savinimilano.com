const products = {
    state: {
        products: null,
        sectors: null,
        applications: null,
        categories: null ,
        adminCategories: null,
        settori: null,
        tipologie: null
    },
    mutations: {
        products ( state , products ){
            state.products = products
        },
        sectors ( state , sectors ){
            state.sectors = sectors
        },
        applications ( state , applications ){
            state.applications = applications
        },
        categories ( state , categories ){
            state.categories = categories
        },
        adminCategories ( state , adminCategories ){
            state.adminCategories = adminCategories
        },
        settori ( state , settori ){
            state.settori = settori
        },
        tipologie ( state , tipologie ){
            state.tipologie = tipologie
        }
    },
    actions: {
        SetProducts ( {commit} , products ){
            commit ( 'products' , products )
        },
        SetSectors ( {commit} , sectors ){
            commit ( 'sectors' , sectors )
        },
        SetApplications ( {commit} , applications ){
            commit ( 'applications' , applications )
        },
        SetCategories ( {commit} , categories ){
            commit ( 'categories' , categories )
        },
        SetAdminCategories ( {commit} , adminCategories ){
            commit ( 'adminCategories' , adminCategories )
        },
        SetSettori ( { commit } , settori ){
            commit ( 'settori' , settori )
        },
        SetTipologie ( { commit } , tipologie ){
            commit ( 'tipologie' , tipologie )
        }
    }
}

export default products