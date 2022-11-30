// @ts-ignore
import CheckList from '@editorjs/checklist'
// @ts-ignore
import Code from '@editorjs/code'
// @ts-ignore
import Delimiter from '@editorjs/delimiter'
// @ts-ignore
import Embed from '@editorjs/embed'
// @ts-ignore
import Header from '@editorjs/header'
// @ts-ignore
import Image from '@editorjs/image'
// @ts-ignore
import InlineCode from '@editorjs/inline-code'
// @ts-ignore
import LinkTool from '@editorjs/link'
// @ts-ignore
import List from '@editorjs/list'
// @ts-ignore
import Marker from '@editorjs/marker'
// @ts-ignore
import Quote from '@editorjs/quote'
// @ts-ignore
import Raw from '@editorjs/raw'
// @ts-ignore
import SimpleImage from '@editorjs/simple-image'
// @ts-ignore
import Table from '@editorjs/table'
// @ts-ignore
import Warning from '@editorjs/warning'

export const editorTools = {
	header: Header,
	code: {
		class: Code,
		inlineToolbar: true
	},
	checklist: {
		class: CheckList,
		inlineToolbar: true
	},
	delimiter: {
		class: Delimiter,
		inlineToolbar: true
	},
	image: {
		class: Image,
		inlineToolbar: true
	},
	inlineCode: {
		class: InlineCode,
		inlineToolbar: true
	},
	linkTool: {
		class: LinkTool,
		inlineToolbar: true
	},
	list: {
		class: List,
		inlineToolbar: true
	},
	marker: {
		class: Marker,
		inlineToolbar: true
	},
	quote: {
		class: Quote,
		inlineToolbar: true
	},
	raw: {
		class: Raw,
		inlineToolbar: true
	},
	simpleImage: {
		class: SimpleImage,
		inlineToolbar: true
	},
	table: {
		class: Table,
		inlineToolbar: true
	},
	warning: {
		class: Warning,
		inlineToolbar: true
	},
	embed: Embed
}
