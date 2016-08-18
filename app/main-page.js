var createViewModel = require("./main-view-model").createViewModel;
var currentPage = 0;
var viewModel;
function onNavigatingTo(args) {
	var page = args.object;
	viewModel = createViewModel();
	viewModel.clear();
	viewModel.loadPosts(currentPage);
	page.bindingContext = viewModel;
}

function loadMore() {
	console.log("Are ou", viewModel.isLoading());
	if (!viewModel.isLoading()) {
		currentPage++;
		viewModel.loadPosts(currentPage);
	}
	console.log("loading", currentPage);
}

function openArticle(args) {
	console.dir(args.index);
}

exports.onNavigatingTo = onNavigatingTo;
exports.loadMore = loadMore;
exports.openArticle = openArticle;