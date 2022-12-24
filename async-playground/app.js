// Sync
const synch = () => {
	const otherFunc = () => {
		console.log("Entering other funct");
		console.log("Do some stuff");
	};

	console.log("Start");

	otherFunc();

	console.log("End");
};

// Async
const asynch = () => {
	console.log("Start");

	setTimeout(() => {
		console.log("We are in timeout");
	}, 2 * 1000);

	const items = [1, 2, 3, 4, 5];

	items.forEach((item) => {
		console.log(item);
	});

	console.log("End");
};

const asyncLogin = () => {
	console.log("Start");

	const loginUser = (email, password, callback) => {
		setTimeout(() => {
			console.log("Now we have the data");
			callback({ userEmail: email });
			return { userEmail: email };
		}, 1.5 * 1000);
	};

	const getUserVideos = (email, callback) => {
		setTimeout(() => {
			console.log({ email });
			callback(["vid1", "vid2", "vid3"]);
		}, 1 * 1000);
	};

	const videoDetails = (video, callback) => {
		setTimeout(() => {
			callback({ video });
			callback("title of video");
		}, 2 * 1000);
	};

	loginUser("test@google.com", 1234, (user) => {
		console.log(user);
		getUserVideos(user.userEmail, (videos) => {
			console.log(videos);
			videoDetails(videos[0], (title) => {
				console.log(title);
			});
		});
	});

	console.log("End");
};

asyncLogin();
