import { Observable } from "data/observable";
import { ObservableArray } from "data/observable-array";
import { get } from './api';


function createViewModel() {
	var viewModel = new Observable();
	viewModel.news = new ObservableArray();
	viewModel.clear = () => {
		while (viewModel.news.length > 0) viewModel.news.pop()
	};

	viewModel.setLoading = function (loading) {
		console.log("Set loading as ", loading);
		viewModel.set("loading", loading);
	};
	viewModel.isLoading = () => {
		console.log("isLoading?", viewModel.get("loading"));
		return viewModel.get("loading");
	};

	viewModel.loadPosts = (page) => {
		viewModel.setLoading(true);
		return new Promise((resolve, reject)=> {
			return get("/post/page/" + page)
				.then((response)=> {
						let {posts} = response || {};
						// console.log("Got posts "+posts.length);
						if (posts && Array.isArray(posts)) {
							// console.log("Is array");
							posts.forEach((item) => {
								viewModel.news.push(item);
							});
							console.log("Got response, set loading as false");
							console.log(viewModel.loading);
							viewModel.setLoading(false);
							return resolve(response);
						}
						viewModel.setLoading(false);
						return reject("Unable to find ");
						// viewModel.news.set(response.posts);
					},
					(e) => {
						console.log(e);
						viewModel.setLoading(false);
					});
		});
	};

	return viewModel;
}

exports.createViewModel = createViewModel;
