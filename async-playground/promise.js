const intro = () => {
	const promise = new Promise((resolve, reject) => {
		setTimeout(() => {
			const success = false;
			if (success) {
				// Successfully got some data back
				console.log("Got the user");
				resolve({ user: "kev" });
			} else {
				// Failed to get data
				console.log("Failed user");
				reject(new Error("Failed to get logged in user"));
			}
		}, 2 * 1000);
	});

	promise
		.then((user) => {
			console.log(user);
		})
		.catch((err) => {
			console.log(err.message);
		});
};

const promiseLogin = () => {
	const loginUser = (email, password) => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				console.log("Now we have the data");
				resolve({ userEmail: email });
			}, 1.5 * 1000);
		});
	};

	const getUserVideos = (email) => {
		console.log("Called getUserVideos");
		return new Promise((resolve, reject) => {
			console.log("Start promise");
			setTimeout(() => {
				console.log({ email });
				console.log("Now we have the videos ready");
				resolve(["vid1", "vid2", "vid3"]);
			}, 10 * 1000);
		});
	};

	const videoDetails = (video, callback) => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				console.log({ video });
				resolve("title of video");
			}, 2 * 1000);
		});
	};

	loginUser("kevin@google.com", 1234).then((user) => {
		console.log({ user });
		getUserVideos(user.email);
	});
	// .then((videos) => {
	// 	console.log({ videos });
	// 	videoDetails(videos[0]);
	// });
	// .then((details) => {
	// 	console.log({ details });
	// });
};

promiseLogin();
