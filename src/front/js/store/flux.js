const url = "https://fluffy-chainsaw-p46xprx57gjf77r9-3001.app.github.dev"

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			user: {}
		},
		actions: {
			
			login: async (email, password) => {
				try {
					let response = await fetch(url+'/api/login', {
						method: 'POST',
						headers: {
							'content-type': 'application/json'
						},
						body: JSON.stringify({
							'email': email,
							'password': password
						})
					})
					
					let data = await response.json();
					if (response.ok){
						localStorage.setItem('token', data.access_token)
						setStore({user: data.user})
						return true
					}
					setStore({user: null})
					return false
				} catch (error) {
					console.log(error);
					return false;
				}
			},
			createAccount: async (email, password) => {
				try {
					let response = await fetch(url + '/api/signup', {
						method: 'POST',
						headers: {
							'content-type': 'application/json'
						},
						body: JSON.stringify({
							'email': email,
							'password': password
						})
					});
			
					let data = await response.json();
			
					if (!response.ok) {
						throw new Error(data.msg);
					}
			
					localStorage.setItem('token', data.access_token);
					setStore({ user: data.user });
					return true;
			
				} catch (error) {
					console.error(error.message);
					return false;
				}
			},
			
			validateToken: async () => {
				let token = localStorage.getItem('token');
				if (!token) {
					setStore({authentication: null});
					return false;
				}
				try {
					let response = await fetch(url+'/api/valid-token', {
						method: 'GET',
						headers: {
							'content-type': 'application/json',
							'authorization': `Bearer ${token}`
						}
					})
					let data = await response.json();
					if (response.ok){
						setStore({user:data.user})
						return true
					}

					setStore({user:null})
					return false;
				} catch (error) {
					setStore({user: null})
					return false;
				}
			},

			logout: () => {
				localStorage.removeItem("token");
				setStore({ user: null})
				console.log("Salí de la sesion")
			}

		
		}
	};
};

export default getState;
