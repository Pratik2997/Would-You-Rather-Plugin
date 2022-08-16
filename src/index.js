import { TextControl, Flex, FlexBlock, FlexItem, Button, Icon, PanelBody, PanelRow, ColorPicker, __experimentalNumberControl as NumberControl } from "@wordpress/components"
import { InspectorControls, BlockControls, AlignmentToolbar } from "@wordpress/block-editor"
//need to run npm install react-color to make it work
import { ChromePicker } from "react-color";
import "./index.css"
import _uniqueId from 'lodash/uniqueId';

(function () {

    let locked = false

    wp.data.subscribe(function () {
        const results = wp.data
            .select("core/block-editor")
            .getBlocks()
            .filter(function (block) {
                return block.name == "wyr/would-you-rather" && block.attributes.id == undefined
            })

        //If there is any a-y-p-a block that doesn't have a correct answer set, lock the Post from saving, i.e don't allow post to save.

        if (results.length && locked == false) {
            locked = true
            wp.data.dispatch("core/editor").lockPostSaving("ID")
        }

        if (!results.length && locked) {
            locked = false
            wp.data.dispatch("core/editor").unlockPostSaving("ID")
        }
    })
})()

wp.blocks.registerBlockType("wyr/would-you-rather", {
    title: "Would You Rather?",
    icon: "editor-help",
    attributes: {
        question: { type: "string" },
        answer1: { type: "string", default: "Answer 1" },
        answer2: { type: "string", default: "Answer 2" },
        bgColor: { type: "string", default: "#EBEBEB" },
        alignment: { type: "string", default: "left" },
        id: { type: "string", default: undefined }
    },
    edit: EditComponent,
    save: function (props) {
        return null
    }
})

function EditComponent(props) {

    function updateQuestion(value) {
        props.setAttributes({ question: value })
    }
    function updateAnswer1(value) {
        props.setAttributes({ answer1: value })
    }
    function updateAnswer2(value) {
        props.setAttributes({ answer2: value })
    }
    function updateId(value) {
        props.setAttributes({id: value})
    }
    return (
        <div className="wyr-block" style={{ backgroundColor: props.attributes.bgColor, textAlign: props.attributes.alignment }}>
            <BlockControls>
                <AlignmentToolbar value={props.attributes.alignment} onChange={x => props.setAttributes({ alignment: x })}></AlignmentToolbar>
            </BlockControls>
            <InspectorControls>
                <PanelBody title="Background Color" initialOpen={true}>
                    <PanelRow>
                        <ChromePicker color={props.attributes.bgColor} onChangeComplete={x => props.setAttributes({ bgColor: x.hex })} disableAlpha={true} />
                    </PanelRow>
                    <PanelRow>
                        <TextControl value={ props.attributes.id } onChange={updateId} type="number" help="Please type unique numeric id here." hideHTMLArrows="true" label="Block Unique Id"></TextControl>
                    </PanelRow>
                </PanelBody>
            </InspectorControls>
            <TextControl label="Type Your Question Below:" className="wyr-question" value={props.attributes.question} onChange={updateQuestion}></TextControl>
            <p style={{ fontSize: "20px", margin: "20px 0 8px 0" }}>Answers:</p>
            <Flex>
                <FlexBlock>
                    <TextControl value={props.attributes.answer1} className="wyr-answer-1" onChange={updateAnswer1}></TextControl>
                </FlexBlock>
                <FlexBlock>
                    <TextControl value={props.attributes.answer2} className="wyr-answer-2" onChange={updateAnswer2}></TextControl>
                </FlexBlock>
            </Flex>
        </div>
    )
}
