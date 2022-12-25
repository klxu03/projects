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

const thenChaining = () => {
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

	const videoDetails = (video) => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				console.log({ video });
				resolve("title of video");
			}, 2 * 1000);
		});
	};

	loginUser("kevin@google.com", 1234)
		.then((user) => {
			console.log({ user });
			return getUserVideos(user.email);
		})
		.then((videos) => {
			console.log({ videos });
			return videoDetails(videos[0]);
		})
		.then((details) => {
			console.log({ details });
		});
};

// Can go ahead and get info from yt and fb at the same time
const promiseAll = () => {
	const yt = new Promise((resolve, reject) => {
		setTimeout(() => {
			console.log("Getting videos from YT");
			resolve({ videos: [1, 2, 3, 4, 5] });
		}, 4 * 1000);
	});

	const fb = new Promise((resolve, reject) => {
		setTimeout(() => {
			console.log("Getting user from FB");
			resolve({ user: "Kev" });
		}, 3 * 1000);
	});

	Promise.all([yt, fb]).then((result) => {
		console.log(result);
	});
};

const asyncAwait = () => {
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

	const videoDetails = (video) => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				console.log({ video });
				resolve("title of video");
			}, 2 * 1000);
		});
	};

	const displayUser = async () => {
		try {
			const user = await loginUser("kev@google.com", 1234);
			const videos = await getUserVideos(user.userEmail);
			const detail = await videoDetails(videos[0]);

			console.log({ detail });
		} catch (err) {
			console.error(err);
		}
	};

	displayUser();
};

asyncAwait();
