const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			authentication: false,
			profileData: {}
		},
		actions: {
			// Use getActions to call a function within a fuction
			
			login: async (email, password) => {
				try {
					let response = await fetch('https://opulent-pancake-9rxpj9pgq4jc7qgp-3001.app.github.dev/api/login', {
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
					localStorage.setItem('token', data.access_token)
					setStore({ authentication: data.logged })
					return data.logged; //devuelve la propiedad logged
				} catch (error) {
					console.log(error);
					return false;
				}
			},
			createAccount: async (email, password) => {
				try {
					let response = await fetch('https://opulent-pancake-9rxpj9pgq4jc7qgp-3001.app.github.dev/api/signup', {
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
					localStorage.setItem('token', data.access_token)
					return data.logged; //devuelve la propiedad logged
				} catch (error) {
					console.log(error);
					return false;
				}
			},
			getProfile: async () => {
				let token = localStorage.getItem('token');
				try {
					let response = await fetch('https://opulent-pancake-9rxpj9pgq4jc7qgp-3001.app.github.dev/api/private', {
						method: 'GET',
						headers: {
							'content-type': 'application/json',
							'authorization': `Bearer ${token}`
						}
					})
					let data = await response.json();
					if (response.ok) {
						setStore({ profileData: data });
						console.log(data);
						return true;
					} else {
						console.log("msg:", data.msg);
						return false;
					}
				} catch (error) {
					console.log(error);
					return false;
				}
			},
			validateToken: async () => {
				let token = localStorage.getItem('token');
				try {
					let response = await fetch('https://opulent-pancake-9rxpj9pgq4jc7qgp-3001.app.github.dev/api/valid-token', {
						method: 'GET',
						headers: {
							'content-type': 'application/json',
							'authorization': `Bearer ${token}`
						}
					})
					let data = await response.json();
					 //setea la propiedad logged definida en routes.py
					console.log(data)
					setStore({ authentication: data.logged })
					return true;
				} catch (error) {
					console.log(error);
					return false;
				}
			},
			logout: () => {
				localStorage.removeItem("token");
				setStore({ authentication: false})
				console.log("Salí de la sesion")
			},
			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			}
		}
	};
};

export default getState;
