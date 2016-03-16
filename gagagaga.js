var path = require("path");
var pressed = {};

function keyDown(event) {
	if (!pressed[event.keyCode]) {
		pressed[event.keyCode] = true;

		var key_down = new Audio(path.join(__dirname, "audio/shot.mp3"));
		key_down.play();

		if (event.keyCode === 13) {
			var key_down = new Audio(path.join(__dirname, "audio/bomb.mp3"));
			key_down.play();
		}
	}
}

function keyUp(event) {
		pressed[event.keyCode] = false;

		var key_up = new Audio(path.join(__dirname, "audio/shot.mp3"));
		key_up.play();
}

module.exports = {
	activate: function(state) {
		atom.workspace.observeTextEditors(function(editor) {
			var editorView = atom.views.getView(editor);

			editorView.addEventListener('keydown', keyDown);
			editorView.addEventListener('keyup', keyUp);
		});
	},

	deactivate: function () {
		atom.workspace.observeTextEditors(function(editor) {
			var editorView = atom.views.getView(editor);

			editorView.removeEventListener('keydown', keyDown);
			editorView.removeEventListener('keyup', keyUp);
		});
	}
};
