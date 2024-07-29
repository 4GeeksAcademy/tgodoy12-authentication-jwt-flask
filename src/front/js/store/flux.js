const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

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
					return true;
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
					return true;
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
					console.log(data)
					return true;
				} catch (error) {
					console.log(error);
					return false;
				}
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
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
