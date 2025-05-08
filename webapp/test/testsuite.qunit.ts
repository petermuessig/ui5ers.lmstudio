export default {
	name: "QUnit test suite for the UI5 Application: ui5ers.lmstudio",
	defaults: {
		page: "ui5://test-resources/ui5ers/lmstudio/Test.qunit.html?testsuite={suite}&test={name}",
		qunit: {
			version: 2
		},
		sinon: {
			version: 4
		},
		ui5: {
			language: "EN",
			theme: "sap_horizon"
		},
		coverage: {
			only: "ui5ers/lmstudio/",
			never: "test-resources/ui5ers/lmstudio/"
		},
		loader: {
			paths: {
				"ui5ers/lmstudio": "../"
			}
		}
	},
	tests: {
		"unit/unitTests": {
			title: "Unit tests for ui5ers.lmstudio"
		},
		"integration/opaTests": {
			title: "Integration tests for ui5ers.lmstudio"
		}
	}
};
