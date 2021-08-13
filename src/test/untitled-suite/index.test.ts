import * as assert from 'assert'
import { commands, window, workspace } from 'vscode'
import { wait } from '../testUtils'

import * as utils from 'vscode-test-utils'

suite('EditorConfig extension untitled workspace', function () {
	suiteTeardown(utils.closeAllFiles)

	test('untitled editors use the first workspace folder config', async () => {
		await commands.executeCommand('workbench.action.files.newUntitledFile')
		await wait(100)

		const activeEditor = window.activeTextEditor
		await wait(50) // Wait for editorconfig settings to apply.

		console.log(workspace.workspaceFolders?.[0]?.uri?.fsPath)
		console.log(activeEditor?.document?.uri?.fsPath)

		assert.strictEqual(activeEditor!.options.tabSize, 2)
	})
})
