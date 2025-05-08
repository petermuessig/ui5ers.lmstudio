import MessageBox from "sap/m/MessageBox";
import BaseController from "./BaseController";

import { LMStudioClient } from "@lmstudio/sdk";
const client = new LMStudioClient();

import { Converter } from "showdown";
import HTML from "sap/ui/core/HTML";

import base64 from 'base64-encode-file';

/**
 * @namespace ui5ers.lmstudio.controller
 */
export default class Main extends BaseController {
	public async sayHello(): Promise<void> {
		MessageBox.show("Hello World!");
	}
	public async submit(): Promise<void> {

		// eslint-disable-next-line
		const value = (this.byId("input") as any).getValue();

		const model = await client.llm.model("llama-3.2-1b-instruct");
		const prediction = model.respond(value as string);

		const buffer = [];
		for await (const fragment of prediction) {
			buffer.push(fragment.content);
			const htmlContent = new Converter().makeHtml(buffer.join(""));
			// eslint-disable-next-line
			(this.byId("htmlOutput") as HTML).setContent(`<div style="color: black;">${htmlContent}</div>`);
		};

	}
	public async describe(): Promise<void> {
		const model = await client.llm.model("qwen2-vl-2b-instruct");

		const imageb64 = await base64((this.byId("uploader") as any).getDomRef().files[0]);

		const image = await client.files.prepareImageBase64("image.jpeg", imageb64.slice(imageb64.indexOf(",") + 1));
		const prediction = model.respond([
			{ role: "user", content: "Describe this image please", images: [image] },
		]);

		const buffer = [];
		for await (const fragment of prediction) {
			buffer.push(fragment.content);
			/* eslint-disable-next-line */
			const htmlContent = new Converter().makeHtml(buffer.join(""));
			(this.byId("htmlOutput") as HTML).setContent(`<div style="color: black;">${htmlContent}</div>`);
		}
	}
}
