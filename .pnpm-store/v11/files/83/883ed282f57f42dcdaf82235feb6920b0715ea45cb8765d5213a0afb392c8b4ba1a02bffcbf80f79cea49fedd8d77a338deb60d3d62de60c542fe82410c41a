import { Buffer } from 'buffer';
import { webcrypto } from 'crypto';
import { TextEncoder, TextDecoder } from 'util';
import Stream from 'stream';
import { ReadableStream } from 'stream/web';
import { URLSearchParams } from 'url';
import VM from 'vm';
import * as PropertySymbol from '../PropertySymbol.js';
import Base64 from '../base64/Base64.js';
import BrowserErrorCaptureEnum from '../browser/enums/BrowserErrorCaptureEnum.js';
import Clipboard from '../clipboard/Clipboard.js';
import ClipboardItem from '../clipboard/ClipboardItem.js';
import CookieStore from '../cookie-store/CookieStore.js';
import CSS from '../css/CSS.js';
import CSSRule from '../css/CSSRule.js';
import CSSUnitValue from '../css/CSSUnitValue.js';
import CSSStyleDeclaration from '../css/declaration/CSSStyleDeclaration.js';
import CSSContainerRule from '../css/rules/CSSContainerRule.js';
import CSSFontFaceRule from '../css/rules/CSSFontFaceRule.js';
import CSSKeyframeRule from '../css/rules/CSSKeyframeRule.js';
import CSSKeyframesRule from '../css/rules/CSSKeyframesRule.js';
import CSSMediaRule from '../css/rules/CSSMediaRule.js';
import CSSStyleRule from '../css/rules/CSSStyleRule.js';
import CSSSupportsRule from '../css/rules/CSSSupportsRule.js';
import CustomElementRegistry from '../custom-element/CustomElementRegistry.js';
import DataTransfer from '../event/DataTransfer.js';
import DataTransferItem from '../event/DataTransferItem.js';
import DataTransferItemList from '../event/DataTransferItemList.js';
import Event from '../event/Event.js';
import EventTarget from '../event/EventTarget.js';
import Touch from '../event/Touch.js';
import UIEvent from '../event/UIEvent.js';
import AnimationEvent from '../event/events/AnimationEvent.js';
import ClipboardEvent from '../event/events/ClipboardEvent.js';
import CookieChangeEvent from '../event/events/CookieChangeEvent.js';
import CustomEvent from '../event/events/CustomEvent.js';
import ErrorEvent from '../event/events/ErrorEvent.js';
import FocusEvent from '../event/events/FocusEvent.js';
import HashChangeEvent from '../event/events/HashChangeEvent.js';
import InputEvent from '../event/events/InputEvent.js';
import KeyboardEvent from '../event/events/KeyboardEvent.js';
import MediaQueryListEvent from '../event/events/MediaQueryListEvent.js';
import MessageEvent from '../event/events/MessageEvent.js';
import MouseEvent from '../event/events/MouseEvent.js';
import PointerEvent from '../event/events/PointerEvent.js';
import ProgressEvent from '../event/events/ProgressEvent.js';
import StorageEvent from '../event/events/StorageEvent.js';
import SubmitEvent from '../event/events/SubmitEvent.js';
import TouchEvent from '../event/events/TouchEvent.js';
import WheelEvent from '../event/events/WheelEvent.js';
import DOMExceptionNameEnum from '../exception/DOMExceptionNameEnum.js';
import Fetch from '../fetch/Fetch.js';
import Blob from '../file/Blob.js';
import File from '../file/File.js';
import History from '../history/History.js';
import IntersectionObserver from '../intersection-observer/IntersectionObserver.js';
import IntersectionObserverEntry from '../intersection-observer/IntersectionObserverEntry.js';
import Location from '../location/Location.js';
import MediaQueryList from '../match-media/MediaQueryList.js';
import MutationRecord from '../mutation-observer/MutationRecord.js';
import MimeType from '../navigator/MimeType.js';
import MimeTypeArray from '../navigator/MimeTypeArray.js';
import Navigator from '../navigator/Navigator.js';
import Plugin from '../navigator/Plugin.js';
import PluginArray from '../navigator/PluginArray.js';
import Attr from '../nodes/attr/Attr.js';
import CharacterData from '../nodes/character-data/CharacterData.js';
import DocumentType from '../nodes/document-type/DocumentType.js';
import DocumentReadyStateEnum from '../nodes/document/DocumentReadyStateEnum.js';
import DocumentReadyStateManager from '../nodes/document/DocumentReadyStateManager.js';
import DOMRect from '../dom/DOMRect.js';
import DOMRectReadOnly from '../dom/DOMRectReadOnly.js';
import Element from '../nodes/element/Element.js';
import HTMLCollection from '../nodes/element/HTMLCollection.js';
import NamedNodeMap from '../nodes/element/NamedNodeMap.js';
import HTMLAnchorElement from '../nodes/html-anchor-element/HTMLAnchorElement.js';
import HTMLAreaElement from '../nodes/html-area-element/HTMLAreaElement.js';
import HTMLAudioElement from '../nodes/html-audio-element/HTMLAudioElement.js';
import HTMLBaseElement from '../nodes/html-base-element/HTMLBaseElement.js';
import HTMLBodyElement from '../nodes/html-body-element/HTMLBodyElement.js';
import HTMLBRElement from '../nodes/html-br-element/HTMLBRElement.js';
import HTMLButtonElement from '../nodes/html-button-element/HTMLButtonElement.js';
import HTMLCanvasElement from '../nodes/html-canvas-element/HTMLCanvasElement.js';
import HTMLDListElement from '../nodes/html-d-list-element/HTMLDListElement.js';
import HTMLDataElement from '../nodes/html-data-element/HTMLDataElement.js';
import HTMLDataListElement from '../nodes/html-data-list-element/HTMLDataListElement.js';
import HTMLDetailsElement from '../nodes/html-details-element/HTMLDetailsElement.js';
import HTMLDialogElement from '../nodes/html-dialog-element/HTMLDialogElement.js';
import HTMLDivElement from '../nodes/html-div-element/HTMLDivElement.js';
import HTMLElement from '../nodes/html-element/HTMLElement.js';
import HTMLEmbedElement from '../nodes/html-embed-element/HTMLEmbedElement.js';
import HTMLFieldSetElement from '../nodes/html-field-set-element/HTMLFieldSetElement.js';
import HTMLFormControlsCollection from '../nodes/html-form-element/HTMLFormControlsCollection.js';
import HTMLFormElement from '../nodes/html-form-element/HTMLFormElement.js';
import RadioNodeList from '../nodes/html-form-element/RadioNodeList.js';
import HTMLHeadElement from '../nodes/html-head-element/HTMLHeadElement.js';
import HTMLHeadingElement from '../nodes/html-heading-element/HTMLHeadingElement.js';
import HTMLHRElement from '../nodes/html-hr-element/HTMLHRElement.js';
import HTMLHtmlElement from '../nodes/html-html-element/HTMLHtmlElement.js';
import HTMLIFrameElement from '../nodes/html-iframe-element/HTMLIFrameElement.js';
import HTMLImageElement from '../nodes/html-image-element/HTMLImageElement.js';
import FileList from '../nodes/html-input-element/FileList.js';
import HTMLInputElement from '../nodes/html-input-element/HTMLInputElement.js';
import HTMLLabelElement from '../nodes/html-label-element/HTMLLabelElement.js';
import HTMLLegendElement from '../nodes/html-legend-element/HTMLLegendElement.js';
import HTMLLIElement from '../nodes/html-li-element/HTMLLIElement.js';
import HTMLLinkElement from '../nodes/html-link-element/HTMLLinkElement.js';
import HTMLMapElement from '../nodes/html-map-element/HTMLMapElement.js';
import HTMLMediaElement from '../nodes/html-media-element/HTMLMediaElement.js';
import TextTrackCueList from '../nodes/html-media-element/TextTrackCueList.js';
import TimeRanges from '../nodes/html-media-element/TimeRanges.js';
import HTMLMenuElement from '../nodes/html-menu-element/HTMLMenuElement.js';
import HTMLMetaElement from '../nodes/html-meta-element/HTMLMetaElement.js';
import HTMLMeterElement from '../nodes/html-meter-element/HTMLMeterElement.js';
import HTMLModElement from '../nodes/html-mod-element/HTMLModElement.js';
import HTMLOListElement from '../nodes/html-o-list-element/HTMLOListElement.js';
import HTMLObjectElement from '../nodes/html-object-element/HTMLObjectElement.js';
import HTMLOptGroupElement from '../nodes/html-opt-group-element/HTMLOptGroupElement.js';
import HTMLOptionElement from '../nodes/html-option-element/HTMLOptionElement.js';
import HTMLOutputElement from '../nodes/html-output-element/HTMLOutputElement.js';
import HTMLParagraphElement from '../nodes/html-paragraph-element/HTMLParagraphElement.js';
import HTMLParamElement from '../nodes/html-param-element/HTMLParamElement.js';
import HTMLPictureElement from '../nodes/html-picture-element/HTMLPictureElement.js';
import HTMLPreElement from '../nodes/html-pre-element/HTMLPreElement.js';
import HTMLProgressElement from '../nodes/html-progress-element/HTMLProgressElement.js';
import HTMLQuoteElement from '../nodes/html-quote-element/HTMLQuoteElement.js';
import HTMLScriptElement from '../nodes/html-script-element/HTMLScriptElement.js';
import HTMLSelectElement from '../nodes/html-select-element/HTMLSelectElement.js';
import HTMLSlotElement from '../nodes/html-slot-element/HTMLSlotElement.js';
import HTMLSourceElement from '../nodes/html-source-element/HTMLSourceElement.js';
import HTMLSpanElement from '../nodes/html-span-element/HTMLSpanElement.js';
import HTMLStyleElement from '../nodes/html-style-element/HTMLStyleElement.js';
import HTMLTableCaptionElement from '../nodes/html-table-caption-element/HTMLTableCaptionElement.js';
import HTMLTableCellElement from '../nodes/html-table-cell-element/HTMLTableCellElement.js';
import HTMLTableColElement from '../nodes/html-table-col-element/HTMLTableColElement.js';
import HTMLTableElement from '../nodes/html-table-element/HTMLTableElement.js';
import HTMLTableRowElement from '../nodes/html-table-row-element/HTMLTableRowElement.js';
import HTMLTableSectionElement from '../nodes/html-table-section-element/HTMLTableSectionElement.js';
import HTMLTemplateElement from '../nodes/html-template-element/HTMLTemplateElement.js';
import HTMLTextAreaElement from '../nodes/html-text-area-element/HTMLTextAreaElement.js';
import HTMLTimeElement from '../nodes/html-time-element/HTMLTimeElement.js';
import HTMLTitleElement from '../nodes/html-title-element/HTMLTitleElement.js';
import HTMLTrackElement from '../nodes/html-track-element/HTMLTrackElement.js';
import HTMLUListElement from '../nodes/html-u-list-element/HTMLUListElement.js';
import HTMLUnknownElement from '../nodes/html-unknown-element/HTMLUnknownElement.js';
import HTMLVideoElement from '../nodes/html-video-element/HTMLVideoElement.js';
import Node from '../nodes/node/Node.js';
import NodeList from '../nodes/node/NodeList.js';
import ProcessingInstruction from '../nodes/processing-instruction/ProcessingInstruction.js';
import ShadowRoot from '../nodes/shadow-root/ShadowRoot.js';
import SVGElement from '../nodes/svg-element/SVGElement.js';
import Permissions from '../permissions/Permissions.js';
import ResizeObserver from '../resize-observer/ResizeObserver.js';
import Screen from '../screen/Screen.js';
import ScreenDetails from '../screen/ScreenDetails.js';
import ScreenDetailed from '../screen/ScreenDetailed.js';
import Selection from '../selection/Selection.js';
import Storage from '../storage/Storage.js';
import NodeFilter from '../tree-walker/NodeFilter.js';
import NodeIterator from '../tree-walker/NodeIterator.js';
import TreeWalker from '../tree-walker/TreeWalker.js';
import ValidityState from '../validity-state/ValidityState.js';
import XMLSerializer from '../xml-serializer/XMLSerializer.js';
import VMGlobalPropertyScript from './VMGlobalPropertyScript.js';
import WindowPageOpenUtility from './WindowPageOpenUtility.js';
import { PerformanceObserver, PerformanceEntry } from 'node:perf_hooks';
import EventPhaseEnum from '../event/EventPhaseEnum.js';
import HTMLOptionsCollection from '../nodes/html-select-element/HTMLOptionsCollection.js';
import WindowContextClassExtender from './WindowContextClassExtender.js';
import WindowBrowserContext from './WindowBrowserContext.js';
import SVGSVGElement from '../nodes/svg-svg-element/SVGSVGElement.js';
import SVGGraphicsElement from '../nodes/svg-graphics-element/SVGGraphicsElement.js';
import SVGAnimateElement from '../nodes/svg-animate-element/SVGAnimateElement.js';
import SVGAnimateMotionElement from '../nodes/svg-animate-motion-element/SVGAnimateMotionElement.js';
import SVGAnimateTransformElement from '../nodes/svg-animate-transform-element/SVGAnimateTransformElement.js';
import SVGCircleElement from '../nodes/svg-circle-element/SVGCircleElement.js';
import SVGClipPathElement from '../nodes/svg-clip-path-element/SVGClipPathElement.js';
import SVGDefsElement from '../nodes/svg-defs-element/SVGDefsElement.js';
import SVGDescElement from '../nodes/svg-desc-element/SVGDescElement.js';
import SVGEllipseElement from '../nodes/svg-ellipse-element/SVGEllipseElement.js';
import SVGFEBlendElement from '../nodes/svg-fe-blend-element/SVGFEBlendElement.js';
import SVGFEColorMatrixElement from '../nodes/svg-fe-color-matrix-element/SVGFEColorMatrixElement.js';
import SVGFEComponentTransferElement from '../nodes/svg-fe-component-transfer-element/SVGFEComponentTransferElement.js';
import SVGFECompositeElement from '../nodes/svg-fe-composite-element/SVGFECompositeElement.js';
import SVGFEConvolveMatrixElement from '../nodes/svg-fe-convolve-matrix-element/SVGFEConvolveMatrixElement.js';
import SVGFEDiffuseLightingElement from '../nodes/svg-fe-diffuse-lighting-element/SVGFEDiffuseLightingElement.js';
import SVGFEDisplacementMapElement from '../nodes/svg-fe-displacement-map-element/SVGFEDisplacementMapElement.js';
import SVGFEDistantLightElement from '../nodes/svg-fe-distant-light-element/SVGFEDistantLightElement.js';
import SVGFEDropShadowElement from '../nodes/svg-fe-drop-shadow-element/SVGFEDropShadowElement.js';
import SVGFEFloodElement from '../nodes/svg-fe-flood-element/SVGFEFloodElement.js';
import SVGFEFuncAElement from '../nodes/svg-fe-func-a-element/SVGFEFuncAElement.js';
import SVGFEFuncBElement from '../nodes/svg-fe-func-b-element/SVGFEFuncBElement.js';
import SVGFEFuncGElement from '../nodes/svg-fe-func-g-element/SVGFEFuncGElement.js';
import SVGFEFuncRElement from '../nodes/svg-fe-func-r-element/SVGFEFuncRElement.js';
import SVGFEGaussianBlurElement from '../nodes/svg-fe-gaussian-blur-element/SVGFEGaussianBlurElement.js';
import SVGFEImageElement from '../nodes/svg-fe-image-element/SVGFEImageElement.js';
import SVGFEMergeElement from '../nodes/svg-fe-merge-element/SVGFEMergeElement.js';
import SVGFEMergeNodeElement from '../nodes/svg-fe-merge-node-element/SVGFEMergeNodeElement.js';
import SVGFEMorphologyElement from '../nodes/svg-fe-morphology-element/SVGFEMorphologyElement.js';
import SVGFEOffsetElement from '../nodes/svg-fe-offset-element/SVGFEOffsetElement.js';
import SVGFEPointLightElement from '../nodes/svg-fe-point-light-element/SVGFEPointLightElement.js';
import SVGFESpecularLightingElement from '../nodes/svg-fe-specular-lighting-element/SVGFESpecularLightingElement.js';
import SVGFESpotLightElement from '../nodes/svg-fe-spot-light-element/SVGFESpotLightElement.js';
import SVGFETileElement from '../nodes/svg-fe-tile-element/SVGFETileElement.js';
import SVGFETurbulenceElement from '../nodes/svg-fe-turbulence-element/SVGFETurbulenceElement.js';
import SVGFilterElement from '../nodes/svg-filter-element/SVGFilterElement.js';
import SVGForeignObjectElement from '../nodes/svg-foreign-object-element/SVGForeignObjectElement.js';
import SVGGElement from '../nodes/svg-g-element/SVGGElement.js';
import SVGImageElement from '../nodes/svg-image-element/SVGImageElement.js';
import SVGLineElement from '../nodes/svg-line-element/SVGLineElement.js';
import SVGLinearGradientElement from '../nodes/svg-linear-gradient-element/SVGLinearGradientElement.js';
import SVGMarkerElement from '../nodes/svg-marker-element/SVGMarkerElement.js';
import SVGMaskElement from '../nodes/svg-mask-element/SVGMaskElement.js';
import SVGMetadataElement from '../nodes/svg-metadata-element/SVGMetadataElement.js';
import SVGMPathElement from '../nodes/svg-m-path-element/SVGMPathElement.js';
import SVGPathElement from '../nodes/svg-path-element/SVGPathElement.js';
import SVGPatternElement from '../nodes/svg-pattern-element/SVGPatternElement.js';
import SVGPolygonElement from '../nodes/svg-polygon-element/SVGPolygonElement.js';
import SVGPolylineElement from '../nodes/svg-polyline-element/SVGPolylineElement.js';
import SVGRadialGradientElement from '../nodes/svg-radial-gradient-element/SVGRadialGradientElement.js';
import SVGRectElement from '../nodes/svg-rect-element/SVGRectElement.js';
import SVGScriptElement from '../nodes/svg-script-element/SVGScriptElement.js';
import SVGSetElement from '../nodes/svg-set-element/SVGSetElement.js';
import SVGStopElement from '../nodes/svg-stop-element/SVGStopElement.js';
import SVGStyleElement from '../nodes/svg-style-element/SVGStyleElement.js';
import SVGSwitchElement from '../nodes/svg-switch-element/SVGSwitchElement.js';
import SVGSymbolElement from '../nodes/svg-symbol-element/SVGSymbolElement.js';
import SVGTextElement from '../nodes/svg-text-element/SVGTextElement.js';
import SVGTextPathElement from '../nodes/svg-text-path-element/SVGTextPathElement.js';
import SVGTitleElement from '../nodes/svg-title-element/SVGTitleElement.js';
import SVGTSpanElement from '../nodes/svg-t-span-element/SVGTSpanElement.js';
import SVGUseElement from '../nodes/svg-use-element/SVGUseElement.js';
import SVGViewElement from '../nodes/svg-view-element/SVGViewElement.js';
import SVGAnimationElement from '../nodes/svg-animation-element/SVGAnimationElement.js';
import SVGComponentTransferFunctionElement from '../nodes/svg-component-transfer-function-element/SVGComponentTransferFunctionElement.js';
import SVGGeometryElement from '../nodes/svg-geometry-element/SVGGeometryElement.js';
import SVGGradientElement from '../nodes/svg-gradient-element/SVGGradientElement.js';
import SVGTextPositioningElement from '../nodes/svg-text-positioning-element/SVGTextPositioningElement.js';
import SVGAngle from '../svg/SVGAngle.js';
import SVGAnimatedAngle from '../svg/SVGAnimatedAngle.js';
import SVGAnimatedBoolean from '../svg/SVGAnimatedBoolean.js';
import SVGAnimatedEnumeration from '../svg/SVGAnimatedEnumeration.js';
import SVGAnimatedInteger from '../svg/SVGAnimatedInteger.js';
import SVGAnimatedLength from '../svg/SVGAnimatedLength.js';
import SVGLength from '../svg/SVGLength.js';
import SVGAnimatedNumber from '../svg/SVGAnimatedNumber.js';
import SVGAnimatedNumberList from '../svg/SVGAnimatedNumberList.js';
import SVGAnimatedPreserveAspectRatio from '../svg/SVGAnimatedPreserveAspectRatio.js';
import SVGAnimatedRect from '../svg/SVGAnimatedRect.js';
import SVGAnimatedString from '../svg/SVGAnimatedString.js';
import SVGAnimatedTransformList from '../svg/SVGAnimatedTransformList.js';
import SVGLengthList from '../svg/SVGLengthList.js';
import SVGMatrix from '../svg/SVGMatrix.js';
import SVGNumber from '../svg/SVGNumber.js';
import SVGNumberList from '../svg/SVGNumberList.js';
import SVGPoint from '../svg/SVGPoint.js';
import SVGPointList from '../svg/SVGPointList.js';
import SVGPreserveAspectRatio from '../svg/SVGPreserveAspectRatio.js';
import SVGRect from '../svg/SVGRect.js';
import SVGStringList from '../svg/SVGStringList.js';
import SVGTransform from '../svg/SVGTransform.js';
import SVGTransformList from '../svg/SVGTransformList.js';
import SVGUnitTypes from '../svg/SVGUnitTypes.js';
import SVGAnimatedLengthList from '../svg/SVGAnimatedLengthList.js';
import CustomElementReactionStack from '../custom-element/CustomElementReactionStack.js';
import StylePropertyMapReadOnly from '../css/style-property-map/StylePropertyMapReadOnly.js';
import StylePropertyMap from '../css/style-property-map/StylePropertyMap.js';
import MediaList from '../css/MediaList.js';
import CSSKeywordValue from '../css/style-property-map/CSSKeywordValue.js';
import CSSStyleValue from '../css/style-property-map/CSSStyleValue.js';
import CSSConditionRule from '../css/rules/CSSConditionRule.js';
import CSSGroupingRule from '../css/rules/CSSGroupingRule.js';
import CSSScopeRule from '../css/rules/CSSScopeRule.js';
import PopStateEvent from '../event/events/PopStateEvent.js';
import CloseEvent from '../event/events/CloseEvent.js';
import ImageBitmap from '../canvas/ImageBitmap.js';
const TIMER = {
    setTimeout: globalThis.setTimeout.bind(globalThis),
    clearTimeout: globalThis.clearTimeout.bind(globalThis),
    setInterval: globalThis.setInterval.bind(globalThis),
    clearInterval: globalThis.clearInterval.bind(globalThis),
    queueMicrotask: globalThis.queueMicrotask.bind(globalThis),
    setImmediate: globalThis.setImmediate.bind(globalThis),
    clearImmediate: globalThis.clearImmediate.bind(globalThis)
};
const IS_NODE_JS_TIMEOUT_ENVIRONMENT = setTimeout.toString().includes('new Timeout');
const IS_CODE_GENERATION_FROM_STRINGS_ENVIRONMENT = (() => {
    try {
        // eslint-disable-next-line no-new-func
        new Function('return true;')();
        return true;
    }
    catch {
        return false;
    }
})();
const IS_UNFROZEN_INTRINSICS_ENVIRONMENT = (() => {
    try {
        globalThis.Function['$UNFROZEN$'] = true;
        delete globalThis.Function['$UNFROZEN$'];
        return true;
    }
    catch {
        return false;
    }
})();
/**
 * Class for PerformanceObserverEntryList as it is only available as an interface from Node.js.
 */
class PerformanceObserverEntryList {
    /**
     * Constructor.
     */
    constructor() {
        throw new TypeError('Illegal constructor');
    }
}
/**
 * Zero Timeout.
 */
class Timeout {
    callback;
    /**
     * Constructor.
     * @param callback Callback.
     */
    constructor(callback) {
        this.callback = callback;
    }
}
/**
 * Browser window.
 *
 * Reference:
 * https://developer.mozilla.org/en-US/docs/Web/API/Window.
 */
export default class BrowserWindow extends EventTarget {
    // Nodes
    Node = Node;
    Attr = Attr;
    ShadowRoot = ShadowRoot;
    ProcessingInstruction = ProcessingInstruction;
    Element = Element;
    CharacterData = CharacterData;
    DocumentType = DocumentType;
    // HTML Element classes
    HTMLAnchorElement = HTMLAnchorElement;
    HTMLButtonElement = HTMLButtonElement;
    HTMLOptGroupElement = HTMLOptGroupElement;
    HTMLOptionElement = HTMLOptionElement;
    HTMLElement = HTMLElement;
    HTMLUnknownElement = HTMLUnknownElement;
    HTMLTemplateElement = HTMLTemplateElement;
    HTMLInputElement = HTMLInputElement;
    HTMLSelectElement = HTMLSelectElement;
    HTMLTextAreaElement = HTMLTextAreaElement;
    HTMLImageElement = HTMLImageElement;
    HTMLStyleElement = HTMLStyleElement;
    HTMLLabelElement = HTMLLabelElement;
    HTMLSlotElement = HTMLSlotElement;
    HTMLMetaElement = HTMLMetaElement;
    HTMLMediaElement = HTMLMediaElement;
    HTMLAudioElement = HTMLAudioElement;
    HTMLVideoElement = HTMLVideoElement;
    HTMLBaseElement = HTMLBaseElement;
    HTMLDialogElement = HTMLDialogElement;
    HTMLScriptElement = HTMLScriptElement;
    HTMLLinkElement = HTMLLinkElement;
    HTMLIFrameElement = HTMLIFrameElement;
    HTMLFormElement = HTMLFormElement;
    HTMLUListElement = HTMLUListElement;
    HTMLTrackElement = HTMLTrackElement;
    HTMLTableRowElement = HTMLTableRowElement;
    HTMLTitleElement = HTMLTitleElement;
    HTMLTimeElement = HTMLTimeElement;
    HTMLTableSectionElement = HTMLTableSectionElement;
    HTMLTableCellElement = HTMLTableCellElement;
    HTMLTableElement = HTMLTableElement;
    HTMLSpanElement = HTMLSpanElement;
    HTMLSourceElement = HTMLSourceElement;
    HTMLQuoteElement = HTMLQuoteElement;
    HTMLProgressElement = HTMLProgressElement;
    HTMLPreElement = HTMLPreElement;
    HTMLPictureElement = HTMLPictureElement;
    HTMLParamElement = HTMLParamElement;
    HTMLParagraphElement = HTMLParagraphElement;
    HTMLOutputElement = HTMLOutputElement;
    HTMLOListElement = HTMLOListElement;
    HTMLObjectElement = HTMLObjectElement;
    HTMLMeterElement = HTMLMeterElement;
    HTMLMenuElement = HTMLMenuElement;
    HTMLMapElement = HTMLMapElement;
    HTMLLIElement = HTMLLIElement;
    HTMLLegendElement = HTMLLegendElement;
    HTMLModElement = HTMLModElement;
    HTMLHtmlElement = HTMLHtmlElement;
    HTMLHRElement = HTMLHRElement;
    HTMLHeadElement = HTMLHeadElement;
    HTMLHeadingElement = HTMLHeadingElement;
    HTMLFieldSetElement = HTMLFieldSetElement;
    HTMLEmbedElement = HTMLEmbedElement;
    HTMLDListElement = HTMLDListElement;
    HTMLDivElement = HTMLDivElement;
    HTMLDetailsElement = HTMLDetailsElement;
    HTMLDataListElement = HTMLDataListElement;
    HTMLDataElement = HTMLDataElement;
    HTMLTableColElement = HTMLTableColElement;
    HTMLTableCaptionElement = HTMLTableCaptionElement;
    HTMLCanvasElement = HTMLCanvasElement;
    HTMLBRElement = HTMLBRElement;
    HTMLBodyElement = HTMLBodyElement;
    HTMLAreaElement = HTMLAreaElement;
    // SVG Element classes
    SVGSVGElement = SVGSVGElement;
    SVGAnimateElement = SVGAnimateElement;
    SVGAnimateMotionElement = SVGAnimateMotionElement;
    SVGAnimateTransformElement = SVGAnimateTransformElement;
    SVGCircleElement = SVGCircleElement;
    SVGClipPathElement = SVGClipPathElement;
    SVGDefsElement = SVGDefsElement;
    SVGDescElement = SVGDescElement;
    SVGEllipseElement = SVGEllipseElement;
    SVGFEBlendElement = SVGFEBlendElement;
    SVGFEColorMatrixElement = SVGFEColorMatrixElement;
    SVGFEComponentTransferElement = SVGFEComponentTransferElement;
    SVGFECompositeElement = SVGFECompositeElement;
    SVGFEConvolveMatrixElement = SVGFEConvolveMatrixElement;
    SVGFEDiffuseLightingElement = SVGFEDiffuseLightingElement;
    SVGFEDisplacementMapElement = SVGFEDisplacementMapElement;
    SVGFEDistantLightElement = SVGFEDistantLightElement;
    SVGFEDropShadowElement = SVGFEDropShadowElement;
    SVGFEFloodElement = SVGFEFloodElement;
    SVGFEFuncAElement = SVGFEFuncAElement;
    SVGFEFuncBElement = SVGFEFuncBElement;
    SVGFEFuncGElement = SVGFEFuncGElement;
    SVGFEFuncRElement = SVGFEFuncRElement;
    SVGFEGaussianBlurElement = SVGFEGaussianBlurElement;
    SVGFEImageElement = SVGFEImageElement;
    SVGFEMergeElement = SVGFEMergeElement;
    SVGFEMergeNodeElement = SVGFEMergeNodeElement;
    SVGFEMorphologyElement = SVGFEMorphologyElement;
    SVGFEOffsetElement = SVGFEOffsetElement;
    SVGFEPointLightElement = SVGFEPointLightElement;
    SVGFESpecularLightingElement = SVGFESpecularLightingElement;
    SVGFESpotLightElement = SVGFESpotLightElement;
    SVGFETileElement = SVGFETileElement;
    SVGFETurbulenceElement = SVGFETurbulenceElement;
    SVGFilterElement = SVGFilterElement;
    SVGForeignObjectElement = SVGForeignObjectElement;
    SVGGElement = SVGGElement;
    SVGImageElement = SVGImageElement;
    SVGLineElement = SVGLineElement;
    SVGLinearGradientElement = SVGLinearGradientElement;
    SVGMarkerElement = SVGMarkerElement;
    SVGMaskElement = SVGMaskElement;
    SVGMetadataElement = SVGMetadataElement;
    SVGMPathElement = SVGMPathElement;
    SVGPathElement = SVGPathElement;
    SVGPatternElement = SVGPatternElement;
    SVGPolygonElement = SVGPolygonElement;
    SVGPolylineElement = SVGPolylineElement;
    SVGRadialGradientElement = SVGRadialGradientElement;
    SVGRectElement = SVGRectElement;
    SVGScriptElement = SVGScriptElement;
    SVGSetElement = SVGSetElement;
    SVGStopElement = SVGStopElement;
    SVGStyleElement = SVGStyleElement;
    SVGSwitchElement = SVGSwitchElement;
    SVGSymbolElement = SVGSymbolElement;
    SVGTextElement = SVGTextElement;
    SVGTextPathElement = SVGTextPathElement;
    SVGTitleElement = SVGTitleElement;
    SVGTSpanElement = SVGTSpanElement;
    SVGUseElement = SVGUseElement;
    SVGViewElement = SVGViewElement;
    // Abstract SVG Element classes
    SVGElement = SVGElement;
    SVGAnimationElement = SVGAnimationElement;
    SVGComponentTransferFunctionElement = SVGComponentTransferFunctionElement;
    SVGGeometryElement = SVGGeometryElement;
    SVGGradientElement = SVGGradientElement;
    SVGTextPositioningElement = SVGTextPositioningElement;
    SVGGraphicsElement = SVGGraphicsElement;
    // Event classes
    Event = Event;
    UIEvent = UIEvent;
    CustomEvent = CustomEvent;
    CloseEvent = CloseEvent;
    AnimationEvent = AnimationEvent;
    KeyboardEvent = KeyboardEvent;
    MessageEvent = MessageEvent;
    MouseEvent = MouseEvent;
    PointerEvent = PointerEvent;
    FocusEvent = FocusEvent;
    WheelEvent = WheelEvent;
    InputEvent = InputEvent;
    ErrorEvent = ErrorEvent;
    StorageEvent = StorageEvent;
    SubmitEvent = SubmitEvent;
    ProgressEvent = ProgressEvent;
    MediaQueryListEvent = MediaQueryListEvent;
    HashChangeEvent = HashChangeEvent;
    ClipboardEvent = ClipboardEvent;
    CookieChangeEvent = CookieChangeEvent;
    TouchEvent = TouchEvent;
    PopStateEvent = PopStateEvent;
    Touch = Touch;
    // Non-implemented event classes
    AudioProcessingEvent = Event;
    BeforeInputEvent = Event;
    BeforeUnloadEvent = Event;
    BlobEvent = Event;
    CompositionEvent = Event;
    CSSFontFaceLoadEvent = Event;
    DeviceLightEvent = Event;
    DeviceMotionEvent = Event;
    DeviceOrientationEvent = Event;
    DeviceProximityEvent = Event;
    DOMTransactionEvent = Event;
    DragEvent = Event;
    EditingBeforeInputEvent = Event;
    FetchEvent = Event;
    GamepadEvent = Event;
    IDBVersionChangeEvent = Event;
    MediaStreamEvent = Event;
    MutationEvent = Event;
    OfflineAudioCompletionEvent = Event;
    OverconstrainedError = Event;
    PageTransitionEvent = Event;
    PaymentRequestUpdateEvent = Event;
    RelatedEvent = Event;
    RTCDataChannelEvent = Event;
    RTCIdentityErrorEvent = Event;
    RTCIdentityEvent = Event;
    RTCPeerConnectionIceEvent = Event;
    SensorEvent = Event;
    SVGEvent = Event;
    SVGZoomEvent = Event;
    TimeEvent = Event;
    TrackEvent = Event;
    TransitionEvent = Event;
    UserProximityEvent = Event;
    WebGLContextEvent = Event;
    TextEvent = Event;
    // Other classes that don't have to be bound to the Window context
    Permissions = Permissions;
    History = History;
    Navigator = Navigator;
    Clipboard = Clipboard;
    TimeRanges = TimeRanges;
    TextTrackCueList = TextTrackCueList;
    ValidityState = ValidityState;
    MutationRecord = MutationRecord;
    IntersectionObserver = IntersectionObserver;
    IntersectionObserverEntry = IntersectionObserverEntry;
    CSSStyleDeclaration = CSSStyleDeclaration;
    CSSRule = CSSRule;
    CSSContainerRule = CSSContainerRule;
    CSSFontFaceRule = CSSFontFaceRule;
    CSSKeyframeRule = CSSKeyframeRule;
    CSSKeyframesRule = CSSKeyframesRule;
    CSSMediaRule = CSSMediaRule;
    CSSStyleRule = CSSStyleRule;
    CSSSupportsRule = CSSSupportsRule;
    CSSConditionRule = CSSConditionRule;
    CSSGroupingRule = CSSGroupingRule;
    CSSScopeRule = CSSScopeRule;
    DOMRect = DOMRect;
    DOMRectReadOnly = DOMRectReadOnly;
    Plugin = Plugin;
    PluginArray = PluginArray;
    Location = Location;
    CustomElementRegistry = CustomElementRegistry;
    ResizeObserver = ResizeObserver;
    Blob = Blob;
    File = File;
    Storage = Storage;
    CookieStore = CookieStore;
    MimeType = MimeType;
    MimeTypeArray = MimeTypeArray;
    NodeFilter = NodeFilter;
    ImageBitmap = ImageBitmap;
    HTMLCollection = HTMLCollection;
    HTMLFormControlCollection = HTMLFormControlsCollection;
    HTMLOptionsCollection = HTMLOptionsCollection;
    NodeList = NodeList;
    RadioNodeList = RadioNodeList;
    FileList = FileList;
    Screen = Screen;
    ScreenDetails = ScreenDetails;
    ScreenDetailed = ScreenDetailed;
    NamedNodeMap = NamedNodeMap;
    TreeWalker = TreeWalker;
    NodeIterator = NodeIterator;
    DataTransfer = DataTransfer;
    DataTransferItem = DataTransferItem;
    DataTransferItemList = DataTransferItemList;
    XMLSerializer = XMLSerializer;
    ClipboardItem = ClipboardItem;
    Selection = Selection;
    CSSUnitValue = CSSUnitValue;
    SVGAngle = SVGAngle;
    SVGAnimatedAngle = SVGAnimatedAngle;
    SVGAnimatedBoolean = SVGAnimatedBoolean;
    SVGAnimatedEnumeration = SVGAnimatedEnumeration;
    SVGAnimatedInteger = SVGAnimatedInteger;
    SVGAnimatedLength = SVGAnimatedLength;
    SVGAnimatedNumber = SVGAnimatedNumber;
    SVGAnimatedNumberList = SVGAnimatedNumberList;
    SVGAnimatedPreserveAspectRatio = SVGAnimatedPreserveAspectRatio;
    SVGAnimatedRect = SVGAnimatedRect;
    SVGAnimatedString = SVGAnimatedString;
    SVGAnimatedTransformList = SVGAnimatedTransformList;
    SVGLength = SVGLength;
    SVGLengthList = SVGLengthList;
    SVGMatrix = SVGMatrix;
    SVGNumber = SVGNumber;
    SVGNumberList = SVGNumberList;
    SVGPoint = SVGPoint;
    SVGPointList = SVGPointList;
    SVGPreserveAspectRatio = SVGPreserveAspectRatio;
    SVGRect = SVGRect;
    SVGStringList = SVGStringList;
    SVGTransform = SVGTransform;
    SVGTransformList = SVGTransformList;
    SVGAnimatedLengthList = SVGAnimatedLengthList;
    SVGUnitTypes = SVGUnitTypes;
    StylePropertyMap = StylePropertyMap;
    StylePropertyMapReadOnly = StylePropertyMapReadOnly;
    MediaList = MediaList;
    CSSKeywordValue = CSSKeywordValue;
    CSSStyleValue = CSSStyleValue;
    Window = this.constructor;
    // Node.js Classes
    URLSearchParams = URLSearchParams;
    WritableStream = Stream.Writable;
    ReadableStream = ReadableStream;
    TransformStream = Stream.Transform;
    PerformanceObserver = PerformanceObserver;
    PerformanceEntry = PerformanceEntry;
    PerformanceObserverEntryList = (PerformanceObserverEntryList);
    // Public properties.
    document;
    customElements = new CustomElementRegistry(this);
    window = this;
    globalThis = this;
    performance = performance;
    screenLeft = 0;
    screenTop = 0;
    screenX = 0;
    screenY = 0;
    crypto = webcrypto;
    TextEncoder = TextEncoder;
    TextDecoder = TextDecoder;
    closed = false;
    console;
    name = '';
    Buffer = Buffer;
    // Public internal properties
    // Used for tracking capture event listeners to improve performance when they are not used.
    // See EventTarget class.
    [PropertySymbol.mutationObservers] = [];
    [PropertySymbol.readyStateManager];
    [PropertySymbol.location];
    [PropertySymbol.history];
    [PropertySymbol.navigator];
    [PropertySymbol.screen];
    [PropertySymbol.sessionStorage];
    [PropertySymbol.localStorage];
    [PropertySymbol.cookieStore];
    [PropertySymbol.self] = this;
    [PropertySymbol.top] = this;
    [PropertySymbol.parent] = this;
    [PropertySymbol.window] = this;
    [PropertySymbol.frames] = this;
    [PropertySymbol.internalId] = -1;
    [PropertySymbol.customElementReactionStack] = new CustomElementReactionStack(this);
    [PropertySymbol.modules] = {
        json: new Map(),
        css: new Map(),
        esm: new Map()
    };
    [PropertySymbol.moduleImportMap] = null;
    [PropertySymbol.openWebSockets] = [];
    [PropertySymbol.propertyEventListeners] = new Map();
    [PropertySymbol.querySelectorCache] = new Map();
    /* eslint-enable jsdoc/require-jsdoc */
    // Private properties
    #browserFrame;
    #innerWidth = null;
    #innerHeight = null;
    #outerWidth = null;
    #outerHeight = null;
    #devicePixelRatio = null;
    #zeroDelayTimeout = { timeouts: null };
    #timerLoopStacks = [];
    #timerLoopLimits = [];
    /**
     * Constructor.
     *
     * @param browserFrame Browser frame.
     * @param [options] Options.
     * @param [options.url] URL.
     */
    constructor(browserFrame, options) {
        super();
        this.#browserFrame = browserFrame;
        this[PropertySymbol.validateJavaScriptExecutionEnvironment]();
        this.console = browserFrame.page.console;
        this[PropertySymbol.readyStateManager] = new DocumentReadyStateManager(browserFrame);
        this[PropertySymbol.navigator] = new Navigator(this);
        this[PropertySymbol.screen] = new Screen();
        this[PropertySymbol.sessionStorage] = new Storage();
        this[PropertySymbol.localStorage] = new Storage();
        this[PropertySymbol.cookieStore] = new CookieStore(PropertySymbol.illegalConstructor, this);
        this[PropertySymbol.location] = new Location(this.#browserFrame, options?.url ?? 'about:blank');
        this[PropertySymbol.history] = new History(this.#browserFrame, this);
        browserFrame[PropertySymbol.history].currentItem.href = options?.url ?? 'about:blank';
        WindowBrowserContext.setWindowBrowserFrameRelation(this, this.#browserFrame);
        this[PropertySymbol.setupVMContext]();
        WindowContextClassExtender.extendClasses(this);
        // Document
        this.document = new this.HTMLDocument();
        this.document[PropertySymbol.defaultView] = this;
        // Ready state manager
        const taskID = browserFrame[PropertySymbol.asyncTaskManager].startTask(() => this[PropertySymbol.readyStateManager].destroy());
        this[PropertySymbol.readyStateManager].waitUntilComplete().then(() => {
            browserFrame[PropertySymbol.asyncTaskManager].endTask(taskID);
            this.document[PropertySymbol.readyState] = DocumentReadyStateEnum.complete;
            this.document.dispatchEvent(new Event('readystatechange'));
            const loadEvent = new Event('load');
            // Not sure why target is set to document here, but this is how it seem to work in the browser
            loadEvent[PropertySymbol.currentTarget] = this;
            loadEvent[PropertySymbol.target] = this.document;
            loadEvent[PropertySymbol.eventPhase] = EventPhaseEnum.atTarget;
            this.dispatchEvent(loadEvent);
            loadEvent[PropertySymbol.currentTarget] = null;
            loadEvent[PropertySymbol.eventPhase] = EventPhaseEnum.none;
            loadEvent[PropertySymbol.dispatching] = false;
        });
        this[PropertySymbol.bindMethods]();
    }
    // Events
    /* eslint-disable jsdoc/require-jsdoc */
    get onsearch() {
        return this[PropertySymbol.propertyEventListeners].get('onsearch') ?? null;
    }
    set onsearch(value) {
        this[PropertySymbol.propertyEventListeners].set('onsearch', value);
    }
    get onappinstalled() {
        return this[PropertySymbol.propertyEventListeners].get('onappinstalled') ?? null;
    }
    set onappinstalled(value) {
        this[PropertySymbol.propertyEventListeners].set('onappinstalled', value);
    }
    get onbeforeinstallprompt() {
        return this[PropertySymbol.propertyEventListeners].get('onbeforeinstallprompt') ?? null;
    }
    set onbeforeinstallprompt(value) {
        this[PropertySymbol.propertyEventListeners].set('onbeforeinstallprompt', value);
    }
    get onabort() {
        return this[PropertySymbol.propertyEventListeners].get('onabort') ?? null;
    }
    set onabort(value) {
        this[PropertySymbol.propertyEventListeners].set('onabort', value);
    }
    get onbeforeinput() {
        return this[PropertySymbol.propertyEventListeners].get('onbeforeinput') ?? null;
    }
    set onbeforeinput(value) {
        this[PropertySymbol.propertyEventListeners].set('onbeforeinput', value);
    }
    get onbeforematch() {
        return this[PropertySymbol.propertyEventListeners].get('onbeforematch') ?? null;
    }
    set onbeforematch(value) {
        this[PropertySymbol.propertyEventListeners].set('onbeforematch', value);
    }
    get onbeforetoggle() {
        return this[PropertySymbol.propertyEventListeners].get('onbeforetoggle') ?? null;
    }
    set onbeforetoggle(value) {
        this[PropertySymbol.propertyEventListeners].set('onbeforetoggle', value);
    }
    get onblur() {
        return this[PropertySymbol.propertyEventListeners].get('onblur') ?? null;
    }
    set onblur(value) {
        this[PropertySymbol.propertyEventListeners].set('onblur', value);
    }
    get oncancel() {
        return this[PropertySymbol.propertyEventListeners].get('oncancel') ?? null;
    }
    set oncancel(value) {
        this[PropertySymbol.propertyEventListeners].set('oncancel', value);
    }
    get oncanplay() {
        return this[PropertySymbol.propertyEventListeners].get('oncanplay') ?? null;
    }
    set oncanplay(value) {
        this[PropertySymbol.propertyEventListeners].set('oncanplay', value);
    }
    get oncanplaythrough() {
        return this[PropertySymbol.propertyEventListeners].get('oncanplaythrough') ?? null;
    }
    set oncanplaythrough(value) {
        this[PropertySymbol.propertyEventListeners].set('oncanplaythrough', value);
    }
    get onchange() {
        return this[PropertySymbol.propertyEventListeners].get('onchange') ?? null;
    }
    set onchange(value) {
        this[PropertySymbol.propertyEventListeners].set('onchange', value);
    }
    get onclick() {
        return this[PropertySymbol.propertyEventListeners].get('onclick') ?? null;
    }
    set onclick(value) {
        this[PropertySymbol.propertyEventListeners].set('onclick', value);
    }
    get onclose() {
        return this[PropertySymbol.propertyEventListeners].get('onclose') ?? null;
    }
    set onclose(value) {
        this[PropertySymbol.propertyEventListeners].set('onclose', value);
    }
    get oncommand() {
        return this[PropertySymbol.propertyEventListeners].get('oncommand') ?? null;
    }
    set oncommand(value) {
        this[PropertySymbol.propertyEventListeners].set('oncommand', value);
    }
    get oncontentvisibilityautostatechange() {
        return (this[PropertySymbol.propertyEventListeners].get('oncontentvisibilityautostatechange') ?? null);
    }
    set oncontentvisibilityautostatechange(value) {
        this[PropertySymbol.propertyEventListeners].set('oncontentvisibilityautostatechange', value);
    }
    get oncontextlost() {
        return this[PropertySymbol.propertyEventListeners].get('oncontextlost') ?? null;
    }
    set oncontextlost(value) {
        this[PropertySymbol.propertyEventListeners].set('oncontextlost', value);
    }
    get oncontextmenu() {
        return this[PropertySymbol.propertyEventListeners].get('oncontextmenu') ?? null;
    }
    set oncontextmenu(value) {
        this[PropertySymbol.propertyEventListeners].set('oncontextmenu', value);
    }
    get oncontextrestored() {
        return this[PropertySymbol.propertyEventListeners].get('oncontextrestored') ?? null;
    }
    set oncontextrestored(value) {
        this[PropertySymbol.propertyEventListeners].set('oncontextrestored', value);
    }
    get oncuechange() {
        return this[PropertySymbol.propertyEventListeners].get('oncuechange') ?? null;
    }
    set oncuechange(value) {
        this[PropertySymbol.propertyEventListeners].set('oncuechange', value);
    }
    get ondblclick() {
        return this[PropertySymbol.propertyEventListeners].get('ondblclick') ?? null;
    }
    set ondblclick(value) {
        this[PropertySymbol.propertyEventListeners].set('ondblclick', value);
    }
    get ondrag() {
        return this[PropertySymbol.propertyEventListeners].get('ondrag') ?? null;
    }
    set ondrag(value) {
        this[PropertySymbol.propertyEventListeners].set('ondrag', value);
    }
    get ondragend() {
        return this[PropertySymbol.propertyEventListeners].get('ondragend') ?? null;
    }
    set ondragend(value) {
        this[PropertySymbol.propertyEventListeners].set('ondragend', value);
    }
    get ondragenter() {
        return this[PropertySymbol.propertyEventListeners].get('ondragenter') ?? null;
    }
    set ondragenter(value) {
        this[PropertySymbol.propertyEventListeners].set('ondragenter', value);
    }
    get ondragleave() {
        return this[PropertySymbol.propertyEventListeners].get('ondragleave') ?? null;
    }
    set ondragleave(value) {
        this[PropertySymbol.propertyEventListeners].set('ondragleave', value);
    }
    get ondragover() {
        return this[PropertySymbol.propertyEventListeners].get('ondragover') ?? null;
    }
    set ondragover(value) {
        this[PropertySymbol.propertyEventListeners].set('ondragover', value);
    }
    get ondragstart() {
        return this[PropertySymbol.propertyEventListeners].get('ondragstart') ?? null;
    }
    set ondragstart(value) {
        this[PropertySymbol.propertyEventListeners].set('ondragstart', value);
    }
    get ondrop() {
        return this[PropertySymbol.propertyEventListeners].get('ondrop') ?? null;
    }
    set ondrop(value) {
        this[PropertySymbol.propertyEventListeners].set('ondrop', value);
    }
    get ondurationchange() {
        return this[PropertySymbol.propertyEventListeners].get('ondurationchange') ?? null;
    }
    set ondurationchange(value) {
        this[PropertySymbol.propertyEventListeners].set('ondurationchange', value);
    }
    get onemptied() {
        return this[PropertySymbol.propertyEventListeners].get('onemptied') ?? null;
    }
    set onemptied(value) {
        this[PropertySymbol.propertyEventListeners].set('onemptied', value);
    }
    get onended() {
        return this[PropertySymbol.propertyEventListeners].get('onended') ?? null;
    }
    set onended(value) {
        this[PropertySymbol.propertyEventListeners].set('onended', value);
    }
    get onerror() {
        return this[PropertySymbol.propertyEventListeners].get('onerror') ?? null;
    }
    set onerror(value) {
        this[PropertySymbol.propertyEventListeners].set('onerror', value);
    }
    get onfocus() {
        return this[PropertySymbol.propertyEventListeners].get('onfocus') ?? null;
    }
    set onfocus(value) {
        this[PropertySymbol.propertyEventListeners].set('onfocus', value);
    }
    get onformdata() {
        return this[PropertySymbol.propertyEventListeners].get('onformdata') ?? null;
    }
    set onformdata(value) {
        this[PropertySymbol.propertyEventListeners].set('onformdata', value);
    }
    get oninput() {
        return this[PropertySymbol.propertyEventListeners].get('oninput') ?? null;
    }
    set oninput(value) {
        this[PropertySymbol.propertyEventListeners].set('oninput', value);
    }
    get oninvalid() {
        return this[PropertySymbol.propertyEventListeners].get('oninvalid') ?? null;
    }
    set oninvalid(value) {
        this[PropertySymbol.propertyEventListeners].set('oninvalid', value);
    }
    get onkeydown() {
        return this[PropertySymbol.propertyEventListeners].get('onkeydown') ?? null;
    }
    set onkeydown(value) {
        this[PropertySymbol.propertyEventListeners].set('onkeydown', value);
    }
    get onkeypress() {
        return this[PropertySymbol.propertyEventListeners].get('onkeypress') ?? null;
    }
    set onkeypress(value) {
        this[PropertySymbol.propertyEventListeners].set('onkeypress', value);
    }
    get onkeyup() {
        return this[PropertySymbol.propertyEventListeners].get('onkeyup') ?? null;
    }
    set onkeyup(value) {
        this[PropertySymbol.propertyEventListeners].set('onkeyup', value);
    }
    get onload() {
        return this[PropertySymbol.propertyEventListeners].get('onload') ?? null;
    }
    set onload(value) {
        this[PropertySymbol.propertyEventListeners].set('onload', value);
    }
    get onloadeddata() {
        return this[PropertySymbol.propertyEventListeners].get('onloadeddata') ?? null;
    }
    set onloadeddata(value) {
        this[PropertySymbol.propertyEventListeners].set('onloadeddata', value);
    }
    get onloadedmetadata() {
        return this[PropertySymbol.propertyEventListeners].get('onloadedmetadata') ?? null;
    }
    set onloadedmetadata(value) {
        this[PropertySymbol.propertyEventListeners].set('onloadedmetadata', value);
    }
    get onloadstart() {
        return this[PropertySymbol.propertyEventListeners].get('onloadstart') ?? null;
    }
    set onloadstart(value) {
        this[PropertySymbol.propertyEventListeners].set('onloadstart', value);
    }
    get onmousedown() {
        return this[PropertySymbol.propertyEventListeners].get('onmousedown') ?? null;
    }
    set onmousedown(value) {
        this[PropertySymbol.propertyEventListeners].set('onmousedown', value);
    }
    get onmouseenter() {
        return this[PropertySymbol.propertyEventListeners].get('onmouseenter') ?? null;
    }
    set onmouseenter(value) {
        this[PropertySymbol.propertyEventListeners].set('onmouseenter', value);
    }
    get onmouseleave() {
        return this[PropertySymbol.propertyEventListeners].get('onmouseleave') ?? null;
    }
    set onmouseleave(value) {
        this[PropertySymbol.propertyEventListeners].set('onmouseleave', value);
    }
    get onmousemove() {
        return this[PropertySymbol.propertyEventListeners].get('onmousemove') ?? null;
    }
    set onmousemove(value) {
        this[PropertySymbol.propertyEventListeners].set('onmousemove', value);
    }
    get onmouseout() {
        return this[PropertySymbol.propertyEventListeners].get('onmouseout') ?? null;
    }
    set onmouseout(value) {
        this[PropertySymbol.propertyEventListeners].set('onmouseout', value);
    }
    get onmouseover() {
        return this[PropertySymbol.propertyEventListeners].get('onmouseover') ?? null;
    }
    set onmouseover(value) {
        this[PropertySymbol.propertyEventListeners].set('onmouseover', value);
    }
    get onmouseup() {
        return this[PropertySymbol.propertyEventListeners].get('onmouseup') ?? null;
    }
    set onmouseup(value) {
        this[PropertySymbol.propertyEventListeners].set('onmouseup', value);
    }
    get onmousewheel() {
        return this[PropertySymbol.propertyEventListeners].get('onmousewheel') ?? null;
    }
    set onmousewheel(value) {
        this[PropertySymbol.propertyEventListeners].set('onmousewheel', value);
    }
    get onpause() {
        return this[PropertySymbol.propertyEventListeners].get('onpause') ?? null;
    }
    set onpause(value) {
        this[PropertySymbol.propertyEventListeners].set('onpause', value);
    }
    get onplay() {
        return this[PropertySymbol.propertyEventListeners].get('onplay') ?? null;
    }
    set onplay(value) {
        this[PropertySymbol.propertyEventListeners].set('onplay', value);
    }
    get onplaying() {
        return this[PropertySymbol.propertyEventListeners].get('onplaying') ?? null;
    }
    set onplaying(value) {
        this[PropertySymbol.propertyEventListeners].set('onplaying', value);
    }
    get onprogress() {
        return this[PropertySymbol.propertyEventListeners].get('onprogress') ?? null;
    }
    set onprogress(value) {
        this[PropertySymbol.propertyEventListeners].set('onprogress', value);
    }
    get onratechange() {
        return this[PropertySymbol.propertyEventListeners].get('onratechange') ?? null;
    }
    set onratechange(value) {
        this[PropertySymbol.propertyEventListeners].set('onratechange', value);
    }
    get onreset() {
        return this[PropertySymbol.propertyEventListeners].get('onreset') ?? null;
    }
    set onreset(value) {
        this[PropertySymbol.propertyEventListeners].set('onreset', value);
    }
    get onresize() {
        return this[PropertySymbol.propertyEventListeners].get('onresize') ?? null;
    }
    set onresize(value) {
        this[PropertySymbol.propertyEventListeners].set('onresize', value);
    }
    get onscroll() {
        return this[PropertySymbol.propertyEventListeners].get('onscroll') ?? null;
    }
    set onscroll(value) {
        this[PropertySymbol.propertyEventListeners].set('onscroll', value);
    }
    get onscrollend() {
        return this[PropertySymbol.propertyEventListeners].get('onscrollend') ?? null;
    }
    set onscrollend(value) {
        this[PropertySymbol.propertyEventListeners].set('onscrollend', value);
    }
    get onsecuritypolicyviolation() {
        return this[PropertySymbol.propertyEventListeners].get('onsecuritypolicyviolation') ?? null;
    }
    set onsecuritypolicyviolation(value) {
        this[PropertySymbol.propertyEventListeners].set('onsecuritypolicyviolation', value);
    }
    get onseeked() {
        return this[PropertySymbol.propertyEventListeners].get('onseeked') ?? null;
    }
    set onseeked(value) {
        this[PropertySymbol.propertyEventListeners].set('onseeked', value);
    }
    get onseeking() {
        return this[PropertySymbol.propertyEventListeners].get('onseeking') ?? null;
    }
    set onseeking(value) {
        this[PropertySymbol.propertyEventListeners].set('onseeking', value);
    }
    get onselect() {
        return this[PropertySymbol.propertyEventListeners].get('onselect') ?? null;
    }
    set onselect(value) {
        this[PropertySymbol.propertyEventListeners].set('onselect', value);
    }
    get onslotchange() {
        return this[PropertySymbol.propertyEventListeners].get('onslotchange') ?? null;
    }
    set onslotchange(value) {
        this[PropertySymbol.propertyEventListeners].set('onslotchange', value);
    }
    get onstalled() {
        return this[PropertySymbol.propertyEventListeners].get('onstalled') ?? null;
    }
    set onstalled(value) {
        this[PropertySymbol.propertyEventListeners].set('onstalled', value);
    }
    get onsubmit() {
        return this[PropertySymbol.propertyEventListeners].get('onsubmit') ?? null;
    }
    set onsubmit(value) {
        this[PropertySymbol.propertyEventListeners].set('onsubmit', value);
    }
    get onsuspend() {
        return this[PropertySymbol.propertyEventListeners].get('onsuspend') ?? null;
    }
    set onsuspend(value) {
        this[PropertySymbol.propertyEventListeners].set('onsuspend', value);
    }
    get ontimeupdate() {
        return this[PropertySymbol.propertyEventListeners].get('ontimeupdate') ?? null;
    }
    set ontimeupdate(value) {
        this[PropertySymbol.propertyEventListeners].set('ontimeupdate', value);
    }
    get ontoggle() {
        return this[PropertySymbol.propertyEventListeners].get('ontoggle') ?? null;
    }
    set ontoggle(value) {
        this[PropertySymbol.propertyEventListeners].set('ontoggle', value);
    }
    get onvolumechange() {
        return this[PropertySymbol.propertyEventListeners].get('onvolumechange') ?? null;
    }
    set onvolumechange(value) {
        this[PropertySymbol.propertyEventListeners].set('onvolumechange', value);
    }
    get onwaiting() {
        return this[PropertySymbol.propertyEventListeners].get('onwaiting') ?? null;
    }
    set onwaiting(value) {
        this[PropertySymbol.propertyEventListeners].set('onwaiting', value);
    }
    get onwebkitanimationend() {
        return this[PropertySymbol.propertyEventListeners].get('onwebkitanimationend') ?? null;
    }
    set onwebkitanimationend(value) {
        this[PropertySymbol.propertyEventListeners].set('onwebkitanimationend', value);
    }
    get onwebkitanimationiteration() {
        return this[PropertySymbol.propertyEventListeners].get('onwebkitanimationiteration') ?? null;
    }
    set onwebkitanimationiteration(value) {
        this[PropertySymbol.propertyEventListeners].set('onwebkitanimationiteration', value);
    }
    get onwebkitanimationstart() {
        return this[PropertySymbol.propertyEventListeners].get('onwebkitanimationstart') ?? null;
    }
    set onwebkitanimationstart(value) {
        this[PropertySymbol.propertyEventListeners].set('onwebkitanimationstart', value);
    }
    get onwebkittransitionend() {
        return this[PropertySymbol.propertyEventListeners].get('onwebkittransitionend') ?? null;
    }
    set onwebkittransitionend(value) {
        this[PropertySymbol.propertyEventListeners].set('onwebkittransitionend', value);
    }
    get onwheel() {
        return this[PropertySymbol.propertyEventListeners].get('onwheel') ?? null;
    }
    set onwheel(value) {
        this[PropertySymbol.propertyEventListeners].set('onwheel', value);
    }
    get onauxclick() {
        return this[PropertySymbol.propertyEventListeners].get('onauxclick') ?? null;
    }
    set onauxclick(value) {
        this[PropertySymbol.propertyEventListeners].set('onauxclick', value);
    }
    get ongotpointercapture() {
        return this[PropertySymbol.propertyEventListeners].get('ongotpointercapture') ?? null;
    }
    set ongotpointercapture(value) {
        this[PropertySymbol.propertyEventListeners].set('ongotpointercapture', value);
    }
    get onlostpointercapture() {
        return this[PropertySymbol.propertyEventListeners].get('onlostpointercapture') ?? null;
    }
    set onlostpointercapture(value) {
        this[PropertySymbol.propertyEventListeners].set('onlostpointercapture', value);
    }
    get onpointerdown() {
        return this[PropertySymbol.propertyEventListeners].get('onpointerdown') ?? null;
    }
    set onpointerdown(value) {
        this[PropertySymbol.propertyEventListeners].set('onpointerdown', value);
    }
    get onpointermove() {
        return this[PropertySymbol.propertyEventListeners].get('onpointermove') ?? null;
    }
    set onpointermove(value) {
        this[PropertySymbol.propertyEventListeners].set('onpointermove', value);
    }
    get onpointerup() {
        return this[PropertySymbol.propertyEventListeners].get('onpointerup') ?? null;
    }
    set onpointerup(value) {
        this[PropertySymbol.propertyEventListeners].set('onpointerup', value);
    }
    get onpointercancel() {
        return this[PropertySymbol.propertyEventListeners].get('onpointercancel') ?? null;
    }
    set onpointercancel(value) {
        this[PropertySymbol.propertyEventListeners].set('onpointercancel', value);
    }
    get onpointerover() {
        return this[PropertySymbol.propertyEventListeners].get('onpointerover') ?? null;
    }
    set onpointerover(value) {
        this[PropertySymbol.propertyEventListeners].set('onpointerover', value);
    }
    get onpointerout() {
        return this[PropertySymbol.propertyEventListeners].get('onpointerout') ?? null;
    }
    set onpointerout(value) {
        this[PropertySymbol.propertyEventListeners].set('onpointerout', value);
    }
    get onpointerenter() {
        return this[PropertySymbol.propertyEventListeners].get('onpointerenter') ?? null;
    }
    set onpointerenter(value) {
        this[PropertySymbol.propertyEventListeners].set('onpointerenter', value);
    }
    get onpointerleave() {
        return this[PropertySymbol.propertyEventListeners].get('onpointerleave') ?? null;
    }
    set onpointerleave(value) {
        this[PropertySymbol.propertyEventListeners].set('onpointerleave', value);
    }
    get onselectstart() {
        return this[PropertySymbol.propertyEventListeners].get('onselectstart') ?? null;
    }
    set onselectstart(value) {
        this[PropertySymbol.propertyEventListeners].set('onselectstart', value);
    }
    get onselectionchange() {
        return this[PropertySymbol.propertyEventListeners].get('onselectionchange') ?? null;
    }
    set onselectionchange(value) {
        this[PropertySymbol.propertyEventListeners].set('onselectionchange', value);
    }
    get onanimationcancel() {
        return this[PropertySymbol.propertyEventListeners].get('onanimationcancel') ?? null;
    }
    set onanimationcancel(value) {
        this[PropertySymbol.propertyEventListeners].set('onanimationcancel', value);
    }
    get onanimationend() {
        return this[PropertySymbol.propertyEventListeners].get('onanimationend') ?? null;
    }
    set onanimationend(value) {
        this[PropertySymbol.propertyEventListeners].set('onanimationend', value);
    }
    get onanimationiteration() {
        return this[PropertySymbol.propertyEventListeners].get('onanimationiteration') ?? null;
    }
    set onanimationiteration(value) {
        this[PropertySymbol.propertyEventListeners].set('onanimationiteration', value);
    }
    get onanimationstart() {
        return this[PropertySymbol.propertyEventListeners].get('onanimationstart') ?? null;
    }
    set onanimationstart(value) {
        this[PropertySymbol.propertyEventListeners].set('onanimationstart', value);
    }
    get ontransitionrun() {
        return this[PropertySymbol.propertyEventListeners].get('ontransitionrun') ?? null;
    }
    set ontransitionrun(value) {
        this[PropertySymbol.propertyEventListeners].set('ontransitionrun', value);
    }
    get ontransitionstart() {
        return this[PropertySymbol.propertyEventListeners].get('ontransitionstart') ?? null;
    }
    set ontransitionstart(value) {
        this[PropertySymbol.propertyEventListeners].set('ontransitionstart', value);
    }
    get ontransitionend() {
        return this[PropertySymbol.propertyEventListeners].get('ontransitionend') ?? null;
    }
    set ontransitionend(value) {
        this[PropertySymbol.propertyEventListeners].set('ontransitionend', value);
    }
    get ontransitioncancel() {
        return this[PropertySymbol.propertyEventListeners].get('ontransitioncancel') ?? null;
    }
    set ontransitioncancel(value) {
        this[PropertySymbol.propertyEventListeners].set('ontransitioncancel', value);
    }
    get onbeforexrselect() {
        return this[PropertySymbol.propertyEventListeners].get('onbeforexrselect') ?? null;
    }
    set onbeforexrselect(value) {
        this[PropertySymbol.propertyEventListeners].set('onbeforexrselect', value);
    }
    get onafterprint() {
        return this[PropertySymbol.propertyEventListeners].get('onafterprint') ?? null;
    }
    set onafterprint(value) {
        this[PropertySymbol.propertyEventListeners].set('onafterprint', value);
    }
    get onbeforeprint() {
        return this[PropertySymbol.propertyEventListeners].get('onbeforeprint') ?? null;
    }
    set onbeforeprint(value) {
        this[PropertySymbol.propertyEventListeners].set('onbeforeprint', value);
    }
    get onbeforeunload() {
        return this[PropertySymbol.propertyEventListeners].get('onbeforeunload') ?? null;
    }
    set onbeforeunload(value) {
        this[PropertySymbol.propertyEventListeners].set('onbeforeunload', value);
    }
    get onhashchange() {
        return this[PropertySymbol.propertyEventListeners].get('onhashchange') ?? null;
    }
    set onhashchange(value) {
        this[PropertySymbol.propertyEventListeners].set('onhashchange', value);
    }
    get onlanguagechange() {
        return this[PropertySymbol.propertyEventListeners].get('onlanguagechange') ?? null;
    }
    set onlanguagechange(value) {
        this[PropertySymbol.propertyEventListeners].set('onlanguagechange', value);
    }
    get onmessage() {
        return this[PropertySymbol.propertyEventListeners].get('onmessage') ?? null;
    }
    set onmessage(value) {
        this[PropertySymbol.propertyEventListeners].set('onmessage', value);
    }
    get onmessageerror() {
        return this[PropertySymbol.propertyEventListeners].get('onmessageerror') ?? null;
    }
    set onmessageerror(value) {
        this[PropertySymbol.propertyEventListeners].set('onmessageerror', value);
    }
    get onoffline() {
        return this[PropertySymbol.propertyEventListeners].get('onoffline') ?? null;
    }
    set onoffline(value) {
        this[PropertySymbol.propertyEventListeners].set('onoffline', value);
    }
    get ononline() {
        return this[PropertySymbol.propertyEventListeners].get('ononline') ?? null;
    }
    set ononline(value) {
        this[PropertySymbol.propertyEventListeners].set('ononline', value);
    }
    get onpagehide() {
        return this[PropertySymbol.propertyEventListeners].get('onpagehide') ?? null;
    }
    set onpagehide(value) {
        this[PropertySymbol.propertyEventListeners].set('onpagehide', value);
    }
    get onpageshow() {
        return this[PropertySymbol.propertyEventListeners].get('onpageshow') ?? null;
    }
    set onpageshow(value) {
        this[PropertySymbol.propertyEventListeners].set('onpageshow', value);
    }
    get onpopstate() {
        return this[PropertySymbol.propertyEventListeners].get('onpopstate') ?? null;
    }
    set onpopstate(value) {
        this[PropertySymbol.propertyEventListeners].set('onpopstate', value);
    }
    get onrejectionhandled() {
        return this[PropertySymbol.propertyEventListeners].get('onrejectionhandled') ?? null;
    }
    set onrejectionhandled(value) {
        this[PropertySymbol.propertyEventListeners].set('onrejectionhandled', value);
    }
    get onstorage() {
        return this[PropertySymbol.propertyEventListeners].get('onstorage') ?? null;
    }
    set onstorage(value) {
        this[PropertySymbol.propertyEventListeners].set('onstorage', value);
    }
    get onunhandledrejection() {
        return this[PropertySymbol.propertyEventListeners].get('onunhandledrejection') ?? null;
    }
    set onunhandledrejection(value) {
        this[PropertySymbol.propertyEventListeners].set('onunhandledrejection', value);
    }
    get onunload() {
        return this[PropertySymbol.propertyEventListeners].get('onunload') ?? null;
    }
    set onunload(value) {
        this[PropertySymbol.propertyEventListeners].set('onunload', value);
    }
    get ondevicemotion() {
        return this[PropertySymbol.propertyEventListeners].get('ondevicemotion') ?? null;
    }
    set ondevicemotion(value) {
        this[PropertySymbol.propertyEventListeners].set('ondevicemotion', value);
    }
    get ondeviceorientation() {
        return this[PropertySymbol.propertyEventListeners].get('ondeviceorientation') ?? null;
    }
    set ondeviceorientation(value) {
        this[PropertySymbol.propertyEventListeners].set('ondeviceorientation', value);
    }
    get ondeviceorientationabsolute() {
        return this[PropertySymbol.propertyEventListeners].get('ondeviceorientationabsolute') ?? null;
    }
    set ondeviceorientationabsolute(value) {
        this[PropertySymbol.propertyEventListeners].set('ondeviceorientationabsolute', value);
    }
    get onpointerrawupdate() {
        return this[PropertySymbol.propertyEventListeners].get('onpointerrawupdate') ?? null;
    }
    set onpointerrawupdate(value) {
        this[PropertySymbol.propertyEventListeners].set('onpointerrawupdate', value);
    }
    get onpageswap() {
        return this[PropertySymbol.propertyEventListeners].get('onpageswap') ?? null;
    }
    set onpageswap(value) {
        this[PropertySymbol.propertyEventListeners].set('onpageswap', value);
    }
    get onpagereveal() {
        return this[PropertySymbol.propertyEventListeners].get('onpagereveal') ?? null;
    }
    set onpagereveal(value) {
        this[PropertySymbol.propertyEventListeners].set('onpagereveal', value);
    }
    get onscrollsnapchange() {
        return this[PropertySymbol.propertyEventListeners].get('onscrollsnapchange') ?? null;
    }
    set onscrollsnapchange(value) {
        this[PropertySymbol.propertyEventListeners].set('onscrollsnapchange', value);
    }
    get onscrollsnapchanging() {
        return this[PropertySymbol.propertyEventListeners].get('onscrollsnapchanging') ?? null;
    }
    set onscrollsnapchanging(value) {
        this[PropertySymbol.propertyEventListeners].set('onscrollsnapchanging', value);
    }
    get ongamepadconnected() {
        return this[PropertySymbol.propertyEventListeners].get('ongamepadconnected') ?? null;
    }
    set ongamepadconnected(value) {
        this[PropertySymbol.propertyEventListeners].set('ongamepadconnected', value);
    }
    get ongamepaddisconnected() {
        return this[PropertySymbol.propertyEventListeners].get('ongamepaddisconnected') ?? null;
    }
    set ongamepaddisconnected(value) {
        this[PropertySymbol.propertyEventListeners].set('ongamepaddisconnected', value);
    }
    /* eslint-enable jsdoc/require-jsdoc */
    /**
     * Returns self.
     *
     * @returns Self.
     */
    get self() {
        return this[PropertySymbol.self];
    }
    /**
     * Sets self.
     *
     * @param self Self.
     */
    set self(self) {
        this[PropertySymbol.self] = self;
    }
    /**
     * Returns top.
     *
     * @returns Top.
     */
    get top() {
        return this[PropertySymbol.top];
    }
    /**
     * Returns parent.
     *
     * @returns Parent.
     */
    get parent() {
        return this[PropertySymbol.parent];
    }
    /**
     * Sets parent.
     *
     * @param parent Parent.
     */
    set parent(parent) {
        this[PropertySymbol.parent] = parent;
    }
    /**
     * Returns frames.
     *
     * @returns Frames.
     */
    get frames() {
        return this[PropertySymbol.frames];
    }
    /**
     * Sets frames.
     *
     * @param frames Frames.
     */
    set frames(frames) {
        this[PropertySymbol.parent] = frames;
    }
    /**
     * Returns location.
     */
    get location() {
        return this[PropertySymbol.location];
    }
    /**
     * Returns location.
     *
     * @param href Href.
     */
    set location(href) {
        this[PropertySymbol.location].href = href;
    }
    /**
     * Returns history.
     */
    get history() {
        return this[PropertySymbol.history];
    }
    /**
     * Returns navigator.
     */
    get navigator() {
        return this[PropertySymbol.navigator];
    }
    /**
     * Returns screen.
     */
    get screen() {
        return this[PropertySymbol.screen];
    }
    /**
     * Returns session storage.
     */
    get sessionStorage() {
        return this[PropertySymbol.sessionStorage];
    }
    /**
     * Returns local storage.
     */
    get localStorage() {
        return this[PropertySymbol.localStorage];
    }
    /**
     * Returns cookie store.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/cookieStore
     */
    get cookieStore() {
        return this[PropertySymbol.cookieStore];
    }
    /**
     * Returns opener.
     *
     * @returns Opener.
     */
    get opener() {
        return this.#browserFrame[PropertySymbol.openerWindow];
    }
    /**
     * The number of pixels that the document is currently scrolled horizontally.
     *
     * @returns Scroll X.
     */
    get scrollX() {
        return this.document?.documentElement?.scrollLeft ?? 0;
    }
    /**
     * The read-only Window property pageXOffset is an alias for scrollX.
     *
     * @returns Scroll X.
     */
    get pageXOffset() {
        return this.scrollX;
    }
    /**
     * The number of pixels that the document is currently scrolled vertically.
     *
     * @returns Scroll Y.
     */
    get scrollY() {
        return this.document?.documentElement?.scrollTop ?? 0;
    }
    /**
     * The read-only Window property pageYOffset is an alias for scrollY.
     *
     * @returns Scroll Y.
     */
    get pageYOffset() {
        return this.scrollY;
    }
    /**
     * The CSS interface holds useful CSS-related methods.
     *
     * @returns CSS interface.
     */
    get CSS() {
        return new CSS();
    }
    /**
     * Returns inner width.
     *
     * @returns Inner width.
     */
    get innerWidth() {
        if (this.#innerWidth === null) {
            return this.#browserFrame.page.viewport.width;
        }
        return this.#innerWidth;
    }
    /**
     * Sets inner width.
     *
     * @param value Inner width.
     */
    set innerWidth(value) {
        this.#innerWidth = value;
    }
    /**
     * Returns inner height.
     *
     * @returns Inner height.
     */
    get innerHeight() {
        // It seems like this value can be defined according to spec, but changing it has no effect on the actual viewport.
        if (this.#innerHeight === null) {
            return this.#browserFrame.page.viewport.height;
        }
        return this.#innerHeight;
    }
    /**
     * Sets inner height.
     *
     * @param value Inner height.
     */
    set innerHeight(value) {
        this.#innerHeight = value;
    }
    /**
     * Returns outer width.
     *
     * @returns Outer width.
     */
    get outerWidth() {
        // It seems like this value can be defined according to spec, but changing it has no effect on the actual viewport.
        if (this.#outerWidth === null) {
            return this.#browserFrame.page.viewport.width;
        }
        return this.#outerWidth;
    }
    /**
     * Sets outer width.
     *
     * @param value Outer width.
     */
    set outerWidth(value) {
        this.#outerWidth = value;
    }
    /**
     * Returns outer height.
     *
     * @returns Outer height.
     */
    get outerHeight() {
        if (this.#outerHeight === null) {
            return this.#browserFrame.page.viewport.height;
        }
        return this.#outerHeight;
    }
    /**
     * Sets outer height.
     *
     * @param value Outer height.
     */
    set outerHeight(value) {
        this.#outerHeight = value;
    }
    /**
     * Returns device pixel ratio.
     *
     * @returns Device pixel ratio.
     */
    get devicePixelRatio() {
        // It seems like this value can be defined according to spec, but changing it has no effect on the actual viewport.
        if (this.#devicePixelRatio === null) {
            return this.#browserFrame.page.viewport.devicePixelRatio;
        }
        return this.#devicePixelRatio;
    }
    /**
     * Sets device pixel ratio.
     *
     * @param value Device pixel ratio.
     */
    set devicePixelRatio(value) {
        this.#devicePixelRatio = value;
    }
    /**
     * Returns an object containing the values of all CSS properties of an element.
     *
     * @param element Element.
     * @returns CSS style declaration.
     */
    getComputedStyle(element) {
        if (!(element instanceof Element)) {
            throw new this.TypeError("Failed to execute 'getComputedStyle' on 'Window': parameter 1 is not of type 'Element'.");
        }
        element[PropertySymbol.computedStyle] =
            element[PropertySymbol.computedStyle] ||
                new CSSStyleDeclaration(PropertySymbol.illegalConstructor, this, { element, computed: true });
        return element[PropertySymbol.computedStyle];
    }
    /**
     * Returns selection.
     *
     * @returns Selection.
     */
    getSelection() {
        return this.document.getSelection();
    }
    /**
     * Scrolls to a particular set of coordinates.
     *
     * @param x X position or options object.
     * @param y Y position.
     */
    scroll(x, y) {
        if (typeof x !== 'object' && arguments.length === 1) {
            throw new this.TypeError("Failed to execute 'scroll' on 'Window': The provided value is not of type 'ScrollToOptions'.");
        }
        const options = typeof x === 'object' ? x : { left: x, top: y };
        if (options.behavior === 'smooth') {
            this.setTimeout(() => {
                if (options.top !== undefined) {
                    const top = Number(options.top);
                    this.document.documentElement.scrollTop = isNaN(top) ? 0 : top;
                }
                if (options.left !== undefined) {
                    const left = Number(options.left);
                    this.document.documentElement.scrollLeft = isNaN(left) ? 0 : left;
                }
            });
        }
        else {
            if (options.top !== undefined) {
                const top = Number(options.top);
                this.document.documentElement.scrollTop = isNaN(top) ? 0 : top;
            }
            if (options.left !== undefined) {
                const left = Number(options.left);
                this.document.documentElement.scrollLeft = isNaN(left) ? 0 : left;
            }
        }
    }
    /**
     * Scrolls to a particular set of coordinates.
     *
     * @param x X position or options object.
     * @param y Y position.
     */
    scrollTo(x, y) {
        if (typeof x !== 'object' && arguments.length === 1) {
            throw new this.TypeError("Failed to execute 'scrollTo' on 'Window': The provided value is not of type 'ScrollToOptions'.");
        }
        this.scroll(x, y);
    }
    /**
     * Scrolls by a relative amount from the current position.
     *
     * @param x Pixels to scroll by from top or scroll options object.
     * @param y Pixels to scroll by from left.
     */
    scrollBy(x, y) {
        if (typeof x !== 'object' && arguments.length === 1) {
            throw new this.TypeError("Failed to execute 'scrollBy' on 'Window': The provided value is not of type 'ScrollToOptions'.");
        }
        const options = typeof x === 'object' ? x : { left: x, top: y };
        this.scroll({
            left: this.document.documentElement.scrollLeft + (options.left ?? 0),
            top: this.document.documentElement.scrollTop + (options.top ?? 0),
            behavior: options.behavior
        });
    }
    /**
     * Shifts focus away from the window.
     */
    blur() {
        // TODO: Implement.
    }
    /**
     * Gives focus to the window.
     */
    focus() {
        // TODO: Implement.
    }
    /**
     * Loads a specified resource into a new or existing browsing context (that is, a tab, a window, or an iframe) under a specified name.
     *
     * @param [url] URL.
     * @param [target] Target.
     * @param [features] Window features.
     * @returns Window.
     */
    open(url, target, features) {
        return WindowPageOpenUtility.openPage(this.#browserFrame, {
            url,
            target,
            features
        });
    }
    /**
     * Closes the window.
     */
    close() {
        // Users can only close the main frame of a page (not child frames such as iframes).
        if (this.#browserFrame.page.mainFrame === this.#browserFrame &&
            // Scripts may close only the windows that were opened by them.
            // In this case, this means windows that have been opened by another window
            this.#browserFrame[PropertySymbol.openerWindow]) {
            this[PropertySymbol.destroy]();
            this.#browserFrame.page.close();
        }
    }
    /**
     * Returns a new MediaQueryList object that can then be used to determine if the document matches the media query string.
     *
     * @param mediaQueryString A string specifying the media query to parse into a MediaQueryList.
     * @returns A new MediaQueryList.
     */
    matchMedia(mediaQueryString) {
        return new MediaQueryList({ window: this, media: mediaQueryString });
    }
    /**
     * Returns a promise that fulfills with a ScreenDetails object instance.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/getScreenDetails
     * @returns A Promise that fulfills with a ScreenDetails object instance.
     */
    getScreenDetails() {
        return Promise.resolve(new ScreenDetails());
    }
    /**
     * Sets a timer which executes a function once the timer expires.
     *
     * @param callback Function to be executed.
     * @param [delay=0] Delay in ms.
     * @param args Arguments passed to the callback function.
     * @returns Timeout ID.
     */
    setTimeout(callback, delay = 0, ...args) {
        if (this.closed) {
            return {};
        }
        const settings = this.#browserFrame.page.context.browser.settings;
        if (settings.timer.preventTimerLoops) {
            const stack = new Error().stack;
            const timerLoopStacks = this.#timerLoopStacks;
            const timerLoopLimits = this.#timerLoopLimits;
            const index = timerLoopStacks.indexOf(stack);
            if (index !== -1) {
                timerLoopLimits[index].timeout++;
                if (timerLoopLimits[index].timeout >=
                    (settings.timer.preventTimerLoops === true
                        ? 1
                        : (settings.timer.preventTimerLoops.timeout ?? 1))) {
                    return {};
                }
            }
            else {
                timerLoopStacks.push(stack);
                timerLoopLimits.push({
                    timeout: 0,
                    requestAnimationFrame: 0
                });
            }
        }
        // We can group timeouts with a delay of 0 into one timeout to improve performance.
        // Grouping timeouts will also improve the performance of the async task manager.
        // It also makes the async task manager more stable as many timeouts may cause waitUntilComplete() to be resolved too early.
        if (!delay) {
            const zeroDelayTimeout = this.#zeroDelayTimeout;
            if (!zeroDelayTimeout.timeouts) {
                const useTryCatch = !settings ||
                    (!settings.disableErrorCapturing &&
                        settings.errorCapture === BrowserErrorCaptureEnum.tryAndCatch);
                const id = TIMER.setTimeout(() => {
                    // We need to call endTimer() before the callback as the callback might throw an error.
                    this.#browserFrame[PropertySymbol.asyncTaskManager].endTimer(id);
                    const timeouts = zeroDelayTimeout.timeouts;
                    zeroDelayTimeout.timeouts = null;
                    for (const timeout of timeouts) {
                        if (useTryCatch) {
                            let result;
                            try {
                                result = timeout.callback();
                            }
                            catch (error) {
                                this[PropertySymbol.dispatchError](error);
                            }
                            if (result instanceof Promise) {
                                result.catch((error) => this[PropertySymbol.dispatchError](error));
                            }
                        }
                        else {
                            timeout.callback();
                        }
                    }
                }, 0);
                zeroDelayTimeout.timeouts = [];
                this.#browserFrame[PropertySymbol.asyncTaskManager].startTimer(id);
            }
            const timeout = new Timeout(() => callback(...args));
            zeroDelayTimeout.timeouts.push(timeout);
            return timeout;
        }
        const useTryCatch = !settings ||
            (!settings.disableErrorCapturing &&
                settings.errorCapture === BrowserErrorCaptureEnum.tryAndCatch);
        const id = TIMER.setTimeout(() => {
            // We need to call endTimer() before the callback as the callback might throw an error.
            this.#browserFrame[PropertySymbol.asyncTaskManager].endTimer(id);
            if (useTryCatch) {
                let result;
                try {
                    result = callback(...args);
                }
                catch (error) {
                    this[PropertySymbol.dispatchError](error);
                }
                if (result instanceof Promise) {
                    result.catch((error) => this[PropertySymbol.dispatchError](error));
                }
            }
            else {
                callback(...args);
            }
        }, settings?.timer.maxTimeout !== -1 && delay && delay > settings?.timer.maxTimeout
            ? settings?.timer.maxTimeout
            : delay);
        this.#browserFrame[PropertySymbol.asyncTaskManager].startTimer(id);
        return id;
    }
    /**
     * Cancels a timeout previously established by calling setTimeout().
     *
     * @param id ID of the timeout.
     */
    clearTimeout(id) {
        if (id && id instanceof Timeout) {
            const zeroDelayTimeout = this.#zeroDelayTimeout;
            if (!zeroDelayTimeout.timeouts) {
                return;
            }
            const index = zeroDelayTimeout.timeouts.indexOf(id);
            if (index !== -1) {
                zeroDelayTimeout.timeouts.splice(index, 1);
            }
            return;
        }
        // We need to make sure that the ID is a Timeout object, otherwise Node.js might throw an error.
        // This is only necessary if we are in a Node.js environment.
        if (IS_NODE_JS_TIMEOUT_ENVIRONMENT && (!id || id.constructor.name !== 'Timeout')) {
            return;
        }
        TIMER.clearTimeout(id);
        this.#browserFrame[PropertySymbol.asyncTaskManager].endTimer(id);
    }
    /**
     * Calls a function with a fixed time delay between each call.
     *
     * @param callback Function to be executed.
     * @param [delay=0] Delay in ms.
     * @param args Arguments passed to the callback function.
     * @returns Interval ID.
     */
    setInterval(callback, delay = 0, ...args) {
        if (this.closed) {
            return {};
        }
        const settings = this.#browserFrame.page.context.browser.settings;
        const useTryCatch = !settings ||
            (!settings.disableErrorCapturing &&
                settings.errorCapture === BrowserErrorCaptureEnum.tryAndCatch);
        let iterations = 0;
        const id = TIMER.setInterval(() => {
            if (useTryCatch) {
                let result;
                try {
                    result = callback(...args);
                }
                catch (error) {
                    this.clearInterval(id);
                    this[PropertySymbol.dispatchError](error);
                }
                if (result instanceof Promise) {
                    result.catch((error) => {
                        this.clearInterval(id);
                        this[PropertySymbol.dispatchError](error);
                    });
                }
            }
            else {
                callback(...args);
            }
            if (settings?.timer.maxIntervalIterations !== -1) {
                if (iterations >= settings?.timer.maxIntervalIterations) {
                    this.clearInterval(id);
                }
                iterations++;
            }
        }, settings?.timer.maxIntervalTime !== -1 && delay && delay > settings?.timer.maxIntervalTime
            ? settings?.timer.maxIntervalTime
            : delay);
        this.#browserFrame[PropertySymbol.asyncTaskManager].startTimer(id);
        return id;
    }
    /**
     * Cancels a timed repeating action which was previously established by a call to setInterval().
     *
     * @param id ID of the interval.
     */
    clearInterval(id) {
        // We need to make sure that the ID is a Timeout object, otherwise Node.js might throw an error.
        // This is only necessary if we are in a Node.js environment.
        if (IS_NODE_JS_TIMEOUT_ENVIRONMENT && (!id || id.constructor.name !== 'Timeout')) {
            return;
        }
        TIMER.clearInterval(id);
        this.#browserFrame[PropertySymbol.asyncTaskManager].endTimer(id);
    }
    /**
     * Mock animation frames with timeouts.
     *
     * @param callback Callback.
     * @returns ID.
     */
    requestAnimationFrame(callback) {
        if (this.closed) {
            return {};
        }
        const settings = this.#browserFrame.page.context.browser.settings;
        if (settings.timer.preventTimerLoops) {
            const stack = new Error().stack;
            const timerLoopStacks = this.#timerLoopStacks;
            const timerLoopLimits = this.#timerLoopLimits;
            const index = timerLoopStacks.indexOf(stack);
            if (index !== -1) {
                timerLoopLimits[index].requestAnimationFrame++;
                if (timerLoopLimits[index].requestAnimationFrame >=
                    (settings.timer.preventTimerLoops === true
                        ? 1
                        : (settings.timer.preventTimerLoops.requestAnimationFrame ?? 1))) {
                    return {};
                }
            }
            else {
                timerLoopStacks.push(stack);
                timerLoopLimits.push({
                    timeout: 0,
                    requestAnimationFrame: 0
                });
            }
        }
        const useTryCatch = !settings ||
            (!settings.disableErrorCapturing &&
                settings.errorCapture === BrowserErrorCaptureEnum.tryAndCatch);
        const id = TIMER.setImmediate(() => {
            // We need to call endImmediate() before the callback as the callback might throw an error.
            this.#browserFrame[PropertySymbol.asyncTaskManager].endImmediate(id);
            if (useTryCatch) {
                let result;
                try {
                    result = callback(this.performance.now());
                }
                catch (error) {
                    this[PropertySymbol.dispatchError](error);
                }
                if (result instanceof Promise) {
                    result.catch((error) => this[PropertySymbol.dispatchError](error));
                }
            }
            else {
                callback(this.performance.now());
            }
        });
        this.#browserFrame[PropertySymbol.asyncTaskManager].startImmediate(id);
        return id;
    }
    /**
     * Mock animation frames with timeouts.
     *
     * @param id ID.
     */
    cancelAnimationFrame(id) {
        // We need to make sure that the ID is an Immediate object, otherwise Node.js might throw an error.
        // This is only necessary if we are in a Node.js environment.
        if (IS_NODE_JS_TIMEOUT_ENVIRONMENT && (!id || id.constructor.name !== 'Immediate')) {
            return;
        }
        TIMER.clearImmediate(id);
        this.#browserFrame[PropertySymbol.asyncTaskManager].endImmediate(id);
    }
    /**
     * Queues a microtask to be executed at a safe time prior to control returning to the browser's event loop.
     *
     * @param callback Function to be executed.
     */
    queueMicrotask(callback) {
        if (this.closed) {
            return;
        }
        let isAborted = false;
        const taskId = this.#browserFrame[PropertySymbol.asyncTaskManager].startTask(() => (isAborted = true));
        const settings = this.#browserFrame.page.context.browser.settings;
        const useTryCatch = !settings ||
            (!settings.disableErrorCapturing &&
                settings.errorCapture === BrowserErrorCaptureEnum.tryAndCatch);
        TIMER.queueMicrotask(() => {
            if (!isAborted) {
                // We need to call endTask() before the callback as the callback might throw an error.
                this.#browserFrame[PropertySymbol.asyncTaskManager].endTask(taskId);
                if (useTryCatch) {
                    let result;
                    try {
                        result = callback();
                    }
                    catch (error) {
                        this[PropertySymbol.dispatchError](error);
                    }
                    if (result instanceof Promise) {
                        result.catch((error) => this[PropertySymbol.dispatchError](error));
                    }
                }
                else {
                    callback();
                }
            }
        });
    }
    /**
     * This method provides an easy, logical way to fetch resources asynchronously across the network.
     *
     * @param url URL.
     * @param [init] Init.
     * @returns Promise.
     */
    async fetch(url, init) {
        if (this.closed) {
            return Promise.reject(new this.DOMException("Failed to execute 'fetch' on 'Window': The window is closed.", DOMExceptionNameEnum.invalidStateError));
        }
        return await new Fetch({
            browserFrame: this.#browserFrame,
            window: this,
            url,
            init
        }).send();
    }
    /**
     * Creates a Base64-encoded ASCII string from a binary string (i.e., a string in which each character in the string is treated as a byte of binary data).
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/btoa
     * @param data Binay data.
     * @returns Base64-encoded string.
     */
    btoa(data) {
        return Base64.btoa(data);
    }
    /**
     * Decodes a string of data which has been encoded using Base64 encoding.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/atob
     * @see https://infra.spec.whatwg.org/#forgiving-base64-encode.
     * @see Https://html.spec.whatwg.org/multipage/webappapis.html#btoa.
     * @param data Binay string.
     * @returns An ASCII string containing decoded data from encodedData.
     */
    atob(data) {
        return Base64.atob(data);
    }
    /**
     * Safely enables cross-origin communication between Window objects; e.g., between a page and a pop-up that it spawned, or between a page and an iframe embedded within it.
     *
     * @param message Message.
     * @param [targetOrigin=*] Target origin.
     * @param _transfer Transfer. Not implemented.
     */
    postMessage(message, targetOrigin = '*', _transfer) {
        // TODO: Implement transfer.
        if (this.closed) {
            return;
        }
        if (targetOrigin && targetOrigin !== '*' && this.location.origin !== targetOrigin) {
            throw new this.DOMException(`Failed to execute 'postMessage' on 'Window': The target origin provided ('${targetOrigin}') does not match the recipient window\'s origin ('${this.location.origin}').`, DOMExceptionNameEnum.securityError);
        }
        try {
            JSON.stringify(message);
        }
        catch (error) {
            throw new this.DOMException(`Failed to execute 'postMessage' on 'Window': The provided message cannot be serialized.`, DOMExceptionNameEnum.invalidStateError);
        }
        this.setTimeout(() => this.dispatchEvent(new MessageEvent('message', {
            data: message,
            origin: this.#browserFrame.parentFrame
                ? this.#browserFrame.parentFrame.window.location.origin
                : this.#browserFrame.window.location.origin,
            source: this.#browserFrame.parentFrame
                ? this.#browserFrame.parentFrame.window
                : this.#browserFrame.window,
            lastEventId: ''
        })));
    }
    /**
     * Resizes the window.
     *
     * @param width Width.
     * @param height Height.
     */
    resizeTo(width, height) {
        if (this.closed) {
            return;
        }
        if (!width || !height) {
            throw new this.DOMException(`Failed to execute 'resizeTo' on 'Window': 2 arguments required, but only ${arguments.length} present.`);
        }
        // We can only resize the window if it is a popup.
        if (this.#browserFrame[PropertySymbol.popup]) {
            this.#browserFrame.page.setViewport({ width, height });
        }
    }
    /**
     * Resizes the current window by a specified amount.
     *
     * @param width Width.
     * @param height Height.
     */
    resizeBy(width, height) {
        if (this.closed) {
            return;
        }
        if (!width || !height) {
            throw new this.DOMException(`Failed to execute 'resizeBy' on 'Window': 2 arguments required, but only ${arguments.length} present.`);
        }
        // We can only resize the window if it is a popup.
        if (this.#browserFrame[PropertySymbol.popup]) {
            const viewport = this.#browserFrame.page.viewport;
            this.#browserFrame.page.setViewport({
                width: viewport.width + width,
                height: viewport.height + height
            });
        }
    }
    /**
     * Creates a bitmap from a given source, optionally cropped to contain only a portion of that source.
     *
     * @param source Source.
     * @param [sx] X.
     * @param [sy] X.
     * @param [sw] Width.
     * @param [sh] Height.
     * @param [options] Options.
     */
    async createImageBitmap(source, sx, sy, sw, sh, options) {
        return new ImageBitmap(PropertySymbol.illegalConstructor, this, source, sx, sy, sw, sh, options);
    }
    /**
     * Dispatches an error event and outputs the error to the console.
     *
     * @param error Error.
     */
    [PropertySymbol.dispatchError](error) {
        this.#browserFrame.page.console.error(error);
        this.dispatchEvent(new ErrorEvent('error', { message: error.message, error }));
    }
    /**
     * Evaluates code in a VM context.
     *
     * @param code Code.
     * @param [options] Options.
     * @param [options.filename] Filename.
     * @returns any.
     */
    [PropertySymbol.evaluateScript](code, options) {
        return new VM.Script(code, options).runInContext(this);
    }
    /**
     * Setup of VM context.
     */
    [PropertySymbol.setupVMContext]() {
        if (!VM.isContext(this)) {
            VM.createContext(this);
            // Sets global properties from the VM to the Window object.
            // Otherwise "this.Array" will be undefined for example.
            VMGlobalPropertyScript.runInContext(this);
        }
    }
    /**
     * Checks if the JavaScript execution environment is secure and outputs a warning if not.
     */
    [PropertySymbol.validateJavaScriptExecutionEnvironment]() {
        const browserFrame = this.#browserFrame;
        if ((IS_CODE_GENERATION_FROM_STRINGS_ENVIRONMENT || IS_UNFROZEN_INTRINSICS_ENVIRONMENT) &&
            browserFrame.page.context.browser.settings.enableJavaScriptEvaluation &&
            !browserFrame.page.context.browser.settings.suppressInsecureJavaScriptEnvironmentWarning &&
            !browserFrame.page.context.browser.settings.suppressCodeGenerationFromStringsWarning) {
            // eslint-disable-next-line no-console
            console.warn('\nWarning! Happy DOM has JavaScript evaluation enabled and is running in an insecure environment.' +
                '\n\nA VM Context is not an isolated environment, and if you run untrusted code you are at risk of RCE (Remote Code Execution) attacks. The attacker can escape the VM and run code at process level.' +
                '\n\nIt is recommended to disable code generation and freeze all builtins at process level by running node with the flags "--disallow-code-generation-from-strings" and "--frozen-intrinsics".' +
                ' You can suppress this warning by setting "suppressInsecureJavaScriptEnvironmentWarning" to "true" at your own risk.' +
                '\n\nFor more information, see https://github.com/capricorn86/happy-dom/wiki/JavaScript-Evaluation-Warning\n\n');
        }
    }
    /**
     * @override
     */
    [PropertySymbol.destroy]() {
        if (this.closed) {
            return;
        }
        super[PropertySymbol.destroy]();
        this.closed = true;
        const mutationObservers = this[PropertySymbol.mutationObservers];
        for (const mutationObserver of mutationObservers) {
            if (mutationObserver[PropertySymbol.destroy]) {
                mutationObserver[PropertySymbol.destroy]();
            }
        }
        this[PropertySymbol.mutationObservers] = [];
        for (const webSocket of this[PropertySymbol.openWebSockets]) {
            webSocket[PropertySymbol.destroy]();
        }
        this[PropertySymbol.openWebSockets] = [];
        this.document[PropertySymbol.destroy]();
        // Create some empty elements for scripts that are still running.
        const htmlElement = this.document.createElement('html');
        const headElement = this.document.createElement('head');
        const bodyElement = this.document.createElement('body');
        htmlElement.appendChild(headElement);
        htmlElement.appendChild(bodyElement);
        this.document[PropertySymbol.appendChild](htmlElement);
        if (this.location[PropertySymbol.destroy]) {
            this.location[PropertySymbol.destroy]();
        }
        if (this.customElements[PropertySymbol.destroy]) {
            this.customElements[PropertySymbol.destroy]();
        }
        if (this.history[PropertySymbol.destroy]) {
            this.history[PropertySymbol.destroy]();
        }
        this[PropertySymbol.querySelectorCache].clear();
        this[PropertySymbol.modules].json.clear();
        this[PropertySymbol.modules].css.clear();
        this[PropertySymbol.modules].esm.clear();
        this.document[PropertySymbol.preloads].clear();
        this.document[PropertySymbol.activeElement] = null;
        this.document[PropertySymbol.nextActiveElement] = null;
        this.document[PropertySymbol.currentScript] = null;
        this.document[PropertySymbol.selection] = null;
        // Clear parent/top references to break circular references
        this[PropertySymbol.parent] = null;
        this[PropertySymbol.top] = null;
        WindowBrowserContext.removeWindowBrowserFrameRelation(this);
    }
    /**
     * Binds methods to a window as scope.
     */
    [PropertySymbol.bindMethods]() {
        for (const _class of [BrowserWindow, EventTarget]) {
            const propertyDescriptors = Object.getOwnPropertyDescriptors(_class.prototype);
            const keys = Object.keys(propertyDescriptors);
            for (const key of keys) {
                const descriptor = propertyDescriptors[key];
                if (descriptor.get || descriptor.set) {
                    Object.defineProperty(this, key, {
                        ...descriptor,
                        get: descriptor.get?.bind(this),
                        set: descriptor.set?.bind(this)
                    });
                }
                else if (key !== 'constructor' &&
                    typeof descriptor.value === 'function' &&
                    !descriptor.value.toString().startsWith('class ')) {
                    Object.defineProperty(this, key, {
                        ...descriptor,
                        value: descriptor.value.bind(this)
                    });
                }
            }
        }
    }
}
//# sourceMappingURL=BrowserWindow.js.map