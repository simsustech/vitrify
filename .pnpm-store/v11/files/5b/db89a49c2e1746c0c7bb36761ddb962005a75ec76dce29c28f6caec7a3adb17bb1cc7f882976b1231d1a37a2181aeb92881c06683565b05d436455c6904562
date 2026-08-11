import { Buffer } from 'buffer';
import { webcrypto } from 'crypto';
import { TextEncoder, TextDecoder } from 'util';
import Stream from 'stream';
import { ReadableStream } from 'stream/web';
import { URLSearchParams } from 'url';
import * as PropertySymbol from '../PropertySymbol.js';
import type IConsole from '../console/IConsole.js';
import type IBrowserFrame from '../browser/types/IBrowserFrame.js';
import Clipboard from '../clipboard/Clipboard.js';
import ClipboardItem from '../clipboard/ClipboardItem.js';
import CookieStore from '../cookie-store/CookieStore.js';
import CSS from '../css/CSS.js';
import CSSRule from '../css/CSSRule.js';
import type CSSStyleSheet from '../css/CSSStyleSheet.js';
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
import type DOMParser from '../dom-parser/DOMParser.js';
import DataTransfer from '../event/DataTransfer.js';
import DataTransferItem from '../event/DataTransferItem.js';
import DataTransferItemList from '../event/DataTransferItemList.js';
import Event from '../event/Event.js';
import EventTarget from '../event/EventTarget.js';
import type MessagePort from '../event/MessagePort.js';
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
import type DOMException from '../exception/DOMException.js';
import type AbortController from '../fetch/AbortController.js';
import type AbortSignal from '../fetch/AbortSignal.js';
import type Headers from '../fetch/Headers.js';
import type Request from '../fetch/Request.js';
import type Response from '../fetch/Response.js';
import type { TRequestInfo } from '../fetch/types/TRequestInfo.js';
import type IRequestInit from '../fetch/types/IRequestInit.js';
import Blob from '../file/Blob.js';
import File from '../file/File.js';
import type FileReader from '../file/FileReader.js';
import type FormData from '../form-data/FormData.js';
import History from '../history/History.js';
import IntersectionObserver from '../intersection-observer/IntersectionObserver.js';
import IntersectionObserverEntry from '../intersection-observer/IntersectionObserverEntry.js';
import Location from '../location/Location.js';
import MediaQueryList from '../match-media/MediaQueryList.js';
import type MutationObserver from '../mutation-observer/MutationObserver.js';
import MutationRecord from '../mutation-observer/MutationRecord.js';
import MimeType from '../navigator/MimeType.js';
import MimeTypeArray from '../navigator/MimeTypeArray.js';
import Navigator from '../navigator/Navigator.js';
import Plugin from '../navigator/Plugin.js';
import PluginArray from '../navigator/PluginArray.js';
import Attr from '../nodes/attr/Attr.js';
import CharacterData from '../nodes/character-data/CharacterData.js';
import type Comment from '../nodes/comment/Comment.js';
import type DocumentFragment from '../nodes/document-fragment/DocumentFragment.js';
import DocumentType from '../nodes/document-type/DocumentType.js';
import type Document from '../nodes/document/Document.js';
import DocumentReadyStateManager from '../nodes/document/DocumentReadyStateManager.js';
import DOMRect from '../dom/DOMRect.js';
import DOMRectReadOnly from '../dom/DOMRectReadOnly.js';
import Element from '../nodes/element/Element.js';
import HTMLCollection from '../nodes/element/HTMLCollection.js';
import NamedNodeMap from '../nodes/element/NamedNodeMap.js';
import HTMLAnchorElement from '../nodes/html-anchor-element/HTMLAnchorElement.js';
import HTMLAreaElement from '../nodes/html-area-element/HTMLAreaElement.js';
import type Audio from '../nodes/html-audio-element/Audio.js';
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
import type HTMLDocument from '../nodes/html-document/HTMLDocument.js';
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
import type Image from '../nodes/html-image-element/Image.js';
import FileList from '../nodes/html-input-element/FileList.js';
import HTMLInputElement from '../nodes/html-input-element/HTMLInputElement.js';
import HTMLLabelElement from '../nodes/html-label-element/HTMLLabelElement.js';
import HTMLLegendElement from '../nodes/html-legend-element/HTMLLegendElement.js';
import HTMLLIElement from '../nodes/html-li-element/HTMLLIElement.js';
import HTMLLinkElement from '../nodes/html-link-element/HTMLLinkElement.js';
import HTMLMapElement from '../nodes/html-map-element/HTMLMapElement.js';
import HTMLMediaElement from '../nodes/html-media-element/HTMLMediaElement.js';
import type MediaStream from '../nodes/html-media-element/MediaStream.js';
import type MediaStreamTrack from '../nodes/html-media-element/MediaStreamTrack.js';
import type RemotePlayback from '../nodes/html-media-element/RemotePlayback.js';
import type TextTrack from '../nodes/html-media-element/TextTrack.js';
import type TextTrackCue from '../nodes/html-media-element/TextTrackCue.js';
import TextTrackCueList from '../nodes/html-media-element/TextTrackCueList.js';
import type TextTrackList from '../nodes/html-media-element/TextTrackList.js';
import TimeRanges from '../nodes/html-media-element/TimeRanges.js';
import type VTTCue from '../nodes/html-media-element/VTTCue.js';
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
import type Text from '../nodes/text/Text.js';
import type XMLDocument from '../nodes/xml-document/XMLDocument.js';
import type PermissionStatus from '../permissions/PermissionStatus.js';
import Permissions from '../permissions/Permissions.js';
import type Range from '../range/Range.js';
import ResizeObserver from '../resize-observer/ResizeObserver.js';
import Screen from '../screen/Screen.js';
import ScreenDetails from '../screen/ScreenDetails.js';
import ScreenDetailed from '../screen/ScreenDetailed.js';
import Selection from '../selection/Selection.js';
import Storage from '../storage/Storage.js';
import NodeIterator from '../tree-walker/NodeIterator.js';
import TreeWalker from '../tree-walker/TreeWalker.js';
import type URL from '../url/URL.js';
import ValidityState from '../validity-state/ValidityState.js';
import type XMLHttpRequest from '../xml-http-request/XMLHttpRequest.js';
import type XMLHttpRequestEventTarget from '../xml-http-request/XMLHttpRequestEventTarget.js';
import type XMLHttpRequestUpload from '../xml-http-request/XMLHttpRequestUpload.js';
import XMLSerializer from '../xml-serializer/XMLSerializer.js';
import type CrossOriginBrowserWindow from './CrossOriginBrowserWindow.js';
import type INodeJSGlobal from './INodeJSGlobal.js';
import type { PerformanceObserverEntryList as IPerformanceObserverEntryList } from 'node:perf_hooks';
import { PerformanceObserver, PerformanceEntry } from 'node:perf_hooks';
import HTMLOptionsCollection from '../nodes/html-select-element/HTMLOptionsCollection.js';
import type CanvasCaptureMediaStreamTrack from '../nodes/html-canvas-element/CanvasCaptureMediaStreamTrack.js';
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
import type DOMMatrixReadOnly from '../dom/dom-matrix/DOMMatrixReadOnly.js';
import type DOMMatrix from '../dom/dom-matrix/DOMMatrix.js';
import type DOMPointReadOnly from '../dom/DOMPointReadOnly.js';
import type DOMPoint from '../dom/DOMPoint.js';
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
import type IScrollToOptions from './IScrollToOptions.js';
import type IModule from '../module/types/IModule.js';
import type IModuleImportMap from '../module/types/IModuleImportMap.js';
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
import type WebSocket from '../web-socket/WebSocket.js';
import type { TImageBitmapSource } from '../canvas/TImageBitmapSource.js';
import type IImageBitmapOptions from '../canvas/IImageBitmapOptions.js';
import ImageBitmap from '../canvas/ImageBitmap.js';
import type ImageData from '../canvas/ImageData.js';
import type OffscreenCanvas from '../canvas/OffscreenCanvas.js';
import type SelectorItem from '../query-selector/SelectorItem.js';
/**
 * Browser window.
 *
 * Reference:
 * https://developer.mozilla.org/en-US/docs/Web/API/Window.
 */
export default class BrowserWindow extends EventTarget implements INodeJSGlobal {
    #private;
    readonly Node: typeof Node;
    readonly Attr: typeof Attr;
    readonly ShadowRoot: typeof ShadowRoot;
    readonly ProcessingInstruction: typeof ProcessingInstruction;
    readonly Element: typeof Element;
    readonly CharacterData: typeof CharacterData;
    readonly DocumentType: typeof DocumentType;
    readonly Document: typeof Document;
    readonly HTMLDocument: typeof HTMLDocument;
    readonly XMLDocument: typeof XMLDocument;
    readonly DocumentFragment: typeof DocumentFragment;
    readonly Text: typeof Text;
    readonly Comment: typeof Comment;
    readonly Image: typeof Image;
    readonly Audio: typeof Audio;
    readonly WebSocket: typeof WebSocket;
    readonly HTMLAnchorElement: typeof HTMLAnchorElement;
    readonly HTMLButtonElement: typeof HTMLButtonElement;
    readonly HTMLOptGroupElement: typeof HTMLOptGroupElement;
    readonly HTMLOptionElement: typeof HTMLOptionElement;
    readonly HTMLElement: typeof HTMLElement;
    readonly HTMLUnknownElement: typeof HTMLUnknownElement;
    readonly HTMLTemplateElement: typeof HTMLTemplateElement;
    readonly HTMLInputElement: typeof HTMLInputElement;
    readonly HTMLSelectElement: typeof HTMLSelectElement;
    readonly HTMLTextAreaElement: typeof HTMLTextAreaElement;
    readonly HTMLImageElement: typeof HTMLImageElement;
    readonly HTMLStyleElement: typeof HTMLStyleElement;
    readonly HTMLLabelElement: typeof HTMLLabelElement;
    readonly HTMLSlotElement: typeof HTMLSlotElement;
    readonly HTMLMetaElement: typeof HTMLMetaElement;
    readonly HTMLMediaElement: typeof HTMLMediaElement;
    readonly HTMLAudioElement: typeof HTMLAudioElement;
    readonly HTMLVideoElement: typeof HTMLVideoElement;
    readonly HTMLBaseElement: typeof HTMLBaseElement;
    readonly HTMLDialogElement: typeof HTMLDialogElement;
    readonly HTMLScriptElement: typeof HTMLScriptElement;
    readonly HTMLLinkElement: typeof HTMLLinkElement;
    readonly HTMLIFrameElement: typeof HTMLIFrameElement;
    readonly HTMLFormElement: typeof HTMLFormElement;
    readonly HTMLUListElement: typeof HTMLUListElement;
    readonly HTMLTrackElement: typeof HTMLTrackElement;
    readonly HTMLTableRowElement: typeof HTMLTableRowElement;
    readonly HTMLTitleElement: typeof HTMLTitleElement;
    readonly HTMLTimeElement: typeof HTMLTimeElement;
    readonly HTMLTableSectionElement: typeof HTMLTableSectionElement;
    readonly HTMLTableCellElement: typeof HTMLTableCellElement;
    readonly HTMLTableElement: typeof HTMLTableElement;
    readonly HTMLSpanElement: typeof HTMLSpanElement;
    readonly HTMLSourceElement: typeof HTMLSourceElement;
    readonly HTMLQuoteElement: typeof HTMLQuoteElement;
    readonly HTMLProgressElement: typeof HTMLProgressElement;
    readonly HTMLPreElement: typeof HTMLPreElement;
    readonly HTMLPictureElement: typeof HTMLPictureElement;
    readonly HTMLParamElement: typeof HTMLParamElement;
    readonly HTMLParagraphElement: typeof HTMLParagraphElement;
    readonly HTMLOutputElement: typeof HTMLOutputElement;
    readonly HTMLOListElement: typeof HTMLOListElement;
    readonly HTMLObjectElement: typeof HTMLObjectElement;
    readonly HTMLMeterElement: typeof HTMLMeterElement;
    readonly HTMLMenuElement: typeof HTMLMenuElement;
    readonly HTMLMapElement: typeof HTMLMapElement;
    readonly HTMLLIElement: typeof HTMLLIElement;
    readonly HTMLLegendElement: typeof HTMLLegendElement;
    readonly HTMLModElement: typeof HTMLModElement;
    readonly HTMLHtmlElement: typeof HTMLHtmlElement;
    readonly HTMLHRElement: typeof HTMLHRElement;
    readonly HTMLHeadElement: typeof HTMLHeadElement;
    readonly HTMLHeadingElement: typeof HTMLHeadingElement;
    readonly HTMLFieldSetElement: typeof HTMLFieldSetElement;
    readonly HTMLEmbedElement: typeof HTMLEmbedElement;
    readonly HTMLDListElement: typeof HTMLDListElement;
    readonly HTMLDivElement: typeof HTMLDivElement;
    readonly HTMLDetailsElement: typeof HTMLDetailsElement;
    readonly HTMLDataListElement: typeof HTMLDataListElement;
    readonly HTMLDataElement: typeof HTMLDataElement;
    readonly HTMLTableColElement: typeof HTMLTableColElement;
    readonly HTMLTableCaptionElement: typeof HTMLTableCaptionElement;
    readonly HTMLCanvasElement: typeof HTMLCanvasElement;
    readonly HTMLBRElement: typeof HTMLBRElement;
    readonly HTMLBodyElement: typeof HTMLBodyElement;
    readonly HTMLAreaElement: typeof HTMLAreaElement;
    readonly SVGSVGElement: typeof SVGSVGElement;
    readonly SVGAnimateElement: typeof SVGAnimateElement;
    readonly SVGAnimateMotionElement: typeof SVGAnimateMotionElement;
    readonly SVGAnimateTransformElement: typeof SVGAnimateTransformElement;
    readonly SVGCircleElement: typeof SVGCircleElement;
    readonly SVGClipPathElement: typeof SVGClipPathElement;
    readonly SVGDefsElement: typeof SVGDefsElement;
    readonly SVGDescElement: typeof SVGDescElement;
    readonly SVGEllipseElement: typeof SVGEllipseElement;
    readonly SVGFEBlendElement: typeof SVGFEBlendElement;
    readonly SVGFEColorMatrixElement: typeof SVGFEColorMatrixElement;
    readonly SVGFEComponentTransferElement: typeof SVGFEComponentTransferElement;
    readonly SVGFECompositeElement: typeof SVGFECompositeElement;
    readonly SVGFEConvolveMatrixElement: typeof SVGFEConvolveMatrixElement;
    readonly SVGFEDiffuseLightingElement: typeof SVGFEDiffuseLightingElement;
    readonly SVGFEDisplacementMapElement: typeof SVGFEDisplacementMapElement;
    readonly SVGFEDistantLightElement: typeof SVGFEDistantLightElement;
    readonly SVGFEDropShadowElement: typeof SVGFEDropShadowElement;
    readonly SVGFEFloodElement: typeof SVGFEFloodElement;
    readonly SVGFEFuncAElement: typeof SVGFEFuncAElement;
    readonly SVGFEFuncBElement: typeof SVGFEFuncBElement;
    readonly SVGFEFuncGElement: typeof SVGFEFuncGElement;
    readonly SVGFEFuncRElement: typeof SVGFEFuncRElement;
    readonly SVGFEGaussianBlurElement: typeof SVGFEGaussianBlurElement;
    readonly SVGFEImageElement: typeof SVGFEImageElement;
    readonly SVGFEMergeElement: typeof SVGFEMergeElement;
    readonly SVGFEMergeNodeElement: typeof SVGFEMergeNodeElement;
    readonly SVGFEMorphologyElement: typeof SVGFEMorphologyElement;
    readonly SVGFEOffsetElement: typeof SVGFEOffsetElement;
    readonly SVGFEPointLightElement: typeof SVGFEPointLightElement;
    readonly SVGFESpecularLightingElement: typeof SVGFESpecularLightingElement;
    readonly SVGFESpotLightElement: typeof SVGFESpotLightElement;
    readonly SVGFETileElement: typeof SVGFETileElement;
    readonly SVGFETurbulenceElement: typeof SVGFETurbulenceElement;
    readonly SVGFilterElement: typeof SVGFilterElement;
    readonly SVGForeignObjectElement: typeof SVGForeignObjectElement;
    readonly SVGGElement: typeof SVGGElement;
    readonly SVGImageElement: typeof SVGImageElement;
    readonly SVGLineElement: typeof SVGLineElement;
    readonly SVGLinearGradientElement: typeof SVGLinearGradientElement;
    readonly SVGMarkerElement: typeof SVGMarkerElement;
    readonly SVGMaskElement: typeof SVGMaskElement;
    readonly SVGMetadataElement: typeof SVGMetadataElement;
    readonly SVGMPathElement: typeof SVGMPathElement;
    readonly SVGPathElement: typeof SVGPathElement;
    readonly SVGPatternElement: typeof SVGPatternElement;
    readonly SVGPolygonElement: typeof SVGPolygonElement;
    readonly SVGPolylineElement: typeof SVGPolylineElement;
    readonly SVGRadialGradientElement: typeof SVGRadialGradientElement;
    readonly SVGRectElement: typeof SVGRectElement;
    readonly SVGScriptElement: typeof SVGScriptElement;
    readonly SVGSetElement: typeof SVGSetElement;
    readonly SVGStopElement: typeof SVGStopElement;
    readonly SVGStyleElement: typeof SVGStyleElement;
    readonly SVGSwitchElement: typeof SVGSwitchElement;
    readonly SVGSymbolElement: typeof SVGSymbolElement;
    readonly SVGTextElement: typeof SVGTextElement;
    readonly SVGTextPathElement: typeof SVGTextPathElement;
    readonly SVGTitleElement: typeof SVGTitleElement;
    readonly SVGTSpanElement: typeof SVGTSpanElement;
    readonly SVGUseElement: typeof SVGUseElement;
    readonly SVGViewElement: typeof SVGViewElement;
    readonly SVGElement: typeof SVGElement;
    readonly SVGAnimationElement: typeof SVGAnimationElement;
    readonly SVGComponentTransferFunctionElement: typeof SVGComponentTransferFunctionElement;
    readonly SVGGeometryElement: typeof SVGGeometryElement;
    readonly SVGGradientElement: typeof SVGGradientElement;
    readonly SVGTextPositioningElement: typeof SVGTextPositioningElement;
    readonly SVGGraphicsElement: typeof SVGGraphicsElement;
    readonly Event: typeof Event;
    readonly UIEvent: typeof UIEvent;
    readonly CustomEvent: typeof CustomEvent;
    readonly CloseEvent: typeof CloseEvent;
    readonly AnimationEvent: typeof AnimationEvent;
    readonly KeyboardEvent: typeof KeyboardEvent;
    readonly MessageEvent: typeof MessageEvent;
    readonly MouseEvent: typeof MouseEvent;
    readonly PointerEvent: typeof PointerEvent;
    readonly FocusEvent: typeof FocusEvent;
    readonly WheelEvent: typeof WheelEvent;
    readonly InputEvent: typeof InputEvent;
    readonly ErrorEvent: typeof ErrorEvent;
    readonly StorageEvent: typeof StorageEvent;
    readonly SubmitEvent: typeof SubmitEvent;
    readonly ProgressEvent: typeof ProgressEvent;
    readonly MediaQueryListEvent: typeof MediaQueryListEvent;
    readonly HashChangeEvent: typeof HashChangeEvent;
    readonly ClipboardEvent: typeof ClipboardEvent;
    readonly CookieChangeEvent: typeof CookieChangeEvent;
    readonly TouchEvent: typeof TouchEvent;
    readonly PopStateEvent: typeof PopStateEvent;
    readonly Touch: typeof Touch;
    readonly AudioProcessingEvent: typeof Event;
    readonly BeforeInputEvent: typeof Event;
    readonly BeforeUnloadEvent: typeof Event;
    readonly BlobEvent: typeof Event;
    readonly CompositionEvent: typeof Event;
    readonly CSSFontFaceLoadEvent: typeof Event;
    readonly DeviceLightEvent: typeof Event;
    readonly DeviceMotionEvent: typeof Event;
    readonly DeviceOrientationEvent: typeof Event;
    readonly DeviceProximityEvent: typeof Event;
    readonly DOMTransactionEvent: typeof Event;
    readonly DragEvent: typeof Event;
    readonly EditingBeforeInputEvent: typeof Event;
    readonly FetchEvent: typeof Event;
    readonly GamepadEvent: typeof Event;
    readonly IDBVersionChangeEvent: typeof Event;
    readonly MediaStreamEvent: typeof Event;
    readonly MutationEvent: typeof Event;
    readonly OfflineAudioCompletionEvent: typeof Event;
    readonly OverconstrainedError: typeof Event;
    readonly PageTransitionEvent: typeof Event;
    readonly PaymentRequestUpdateEvent: typeof Event;
    readonly RelatedEvent: typeof Event;
    readonly RTCDataChannelEvent: typeof Event;
    readonly RTCIdentityErrorEvent: typeof Event;
    readonly RTCIdentityEvent: typeof Event;
    readonly RTCPeerConnectionIceEvent: typeof Event;
    readonly SensorEvent: typeof Event;
    readonly SVGEvent: typeof Event;
    readonly SVGZoomEvent: typeof Event;
    readonly TimeEvent: typeof Event;
    readonly TrackEvent: typeof Event;
    readonly TransitionEvent: typeof Event;
    readonly UserProximityEvent: typeof Event;
    readonly WebGLContextEvent: typeof Event;
    readonly TextEvent: typeof Event;
    readonly MutationObserver: typeof MutationObserver;
    readonly MessagePort: typeof MessagePort;
    readonly CSSStyleSheet: typeof CSSStyleSheet;
    readonly DOMException: typeof DOMException;
    readonly Headers: typeof Headers;
    readonly Request: typeof Request;
    readonly Response: typeof Response;
    readonly EventTarget: typeof EventTarget;
    readonly XMLHttpRequestUpload: typeof XMLHttpRequestUpload;
    readonly XMLHttpRequestEventTarget: typeof XMLHttpRequestEventTarget;
    readonly AbortController: typeof AbortController;
    readonly AbortSignal: typeof AbortSignal;
    readonly FormData: typeof FormData;
    readonly PermissionStatus: typeof PermissionStatus;
    readonly XMLHttpRequest: typeof XMLHttpRequest;
    readonly DOMParser: typeof DOMParser;
    readonly Range: typeof Range;
    readonly VTTCue: typeof VTTCue;
    readonly FileReader: typeof FileReader;
    readonly MediaStream: typeof MediaStream;
    readonly MediaStreamTrack: typeof MediaStreamTrack;
    readonly CanvasCaptureMediaStreamTrack: typeof CanvasCaptureMediaStreamTrack;
    readonly TextTrack: typeof TextTrack;
    readonly TextTrackList: typeof TextTrackList;
    readonly TextTrackCue: typeof TextTrackCue;
    readonly RemotePlayback: typeof RemotePlayback;
    readonly URL: typeof URL;
    readonly ImageData: typeof ImageData;
    readonly OffscreenCanvas: typeof OffscreenCanvas;
    readonly DOMMatrixReadOnly: typeof DOMMatrixReadOnly;
    readonly DOMMatrix: typeof DOMMatrix;
    readonly DOMPointReadOnly: typeof DOMPointReadOnly;
    readonly DOMPoint: typeof DOMPoint;
    readonly Permissions: typeof Permissions;
    readonly History: typeof History;
    readonly Navigator: typeof Navigator;
    readonly Clipboard: typeof Clipboard;
    readonly TimeRanges: typeof TimeRanges;
    readonly TextTrackCueList: typeof TextTrackCueList;
    readonly ValidityState: typeof ValidityState;
    readonly MutationRecord: typeof MutationRecord;
    readonly IntersectionObserver: typeof IntersectionObserver;
    readonly IntersectionObserverEntry: typeof IntersectionObserverEntry;
    readonly CSSStyleDeclaration: typeof CSSStyleDeclaration;
    readonly CSSRule: typeof CSSRule;
    readonly CSSContainerRule: typeof CSSContainerRule;
    readonly CSSFontFaceRule: typeof CSSFontFaceRule;
    readonly CSSKeyframeRule: typeof CSSKeyframeRule;
    readonly CSSKeyframesRule: typeof CSSKeyframesRule;
    readonly CSSMediaRule: typeof CSSMediaRule;
    readonly CSSStyleRule: typeof CSSStyleRule;
    readonly CSSSupportsRule: typeof CSSSupportsRule;
    readonly CSSConditionRule: typeof CSSConditionRule;
    readonly CSSGroupingRule: typeof CSSGroupingRule;
    readonly CSSScopeRule: typeof CSSScopeRule;
    readonly DOMRect: typeof DOMRect;
    readonly DOMRectReadOnly: typeof DOMRectReadOnly;
    readonly Plugin: typeof Plugin;
    readonly PluginArray: typeof PluginArray;
    readonly Location: typeof Location;
    readonly CustomElementRegistry: typeof CustomElementRegistry;
    readonly ResizeObserver: typeof ResizeObserver;
    readonly Blob: typeof Blob;
    readonly File: typeof File;
    readonly Storage: typeof Storage;
    readonly CookieStore: typeof CookieStore;
    readonly MimeType: typeof MimeType;
    readonly MimeTypeArray: typeof MimeTypeArray;
    readonly NodeFilter: {
        FILTER_ACCEPT: number;
        FILTER_REJECT: number;
        FILTER_SKIP: number;
        SHOW_ALL: number;
        SHOW_ELEMENT: number;
        SHOW_ATTRIBUTE: number;
        SHOW_TEXT: number;
        SHOW_CDATA_SECTION: number;
        SHOW_ENTITY_REFERENCE: number;
        SHOW_ENTITY: number;
        SHOW_PROCESSING_INSTRUCTION: number;
        SHOW_COMMENT: number;
        SHOW_DOCUMENT: number;
        SHOW_DOCUMENT_TYPE: number;
        SHOW_DOCUMENT_FRAGMENT: number;
        SHOW_NOTATION: number;
    };
    readonly ImageBitmap: typeof ImageBitmap;
    readonly HTMLCollection: typeof HTMLCollection;
    readonly HTMLFormControlCollection: typeof HTMLFormControlsCollection;
    readonly HTMLOptionsCollection: typeof HTMLOptionsCollection;
    readonly NodeList: typeof NodeList;
    readonly RadioNodeList: typeof RadioNodeList;
    readonly FileList: typeof FileList;
    readonly Screen: typeof Screen;
    readonly ScreenDetails: typeof ScreenDetails;
    readonly ScreenDetailed: typeof ScreenDetailed;
    readonly NamedNodeMap: typeof NamedNodeMap;
    readonly TreeWalker: typeof TreeWalker;
    readonly NodeIterator: typeof NodeIterator;
    readonly DataTransfer: typeof DataTransfer;
    readonly DataTransferItem: typeof DataTransferItem;
    readonly DataTransferItemList: typeof DataTransferItemList;
    readonly XMLSerializer: typeof XMLSerializer;
    readonly ClipboardItem: typeof ClipboardItem;
    readonly Selection: typeof Selection;
    readonly CSSUnitValue: typeof CSSUnitValue;
    readonly SVGAngle: typeof SVGAngle;
    readonly SVGAnimatedAngle: typeof SVGAnimatedAngle;
    readonly SVGAnimatedBoolean: typeof SVGAnimatedBoolean;
    readonly SVGAnimatedEnumeration: typeof SVGAnimatedEnumeration;
    readonly SVGAnimatedInteger: typeof SVGAnimatedInteger;
    readonly SVGAnimatedLength: typeof SVGAnimatedLength;
    readonly SVGAnimatedNumber: typeof SVGAnimatedNumber;
    readonly SVGAnimatedNumberList: typeof SVGAnimatedNumberList;
    readonly SVGAnimatedPreserveAspectRatio: typeof SVGAnimatedPreserveAspectRatio;
    readonly SVGAnimatedRect: typeof SVGAnimatedRect;
    readonly SVGAnimatedString: typeof SVGAnimatedString;
    readonly SVGAnimatedTransformList: typeof SVGAnimatedTransformList;
    readonly SVGLength: typeof SVGLength;
    readonly SVGLengthList: typeof SVGLengthList;
    readonly SVGMatrix: typeof SVGMatrix;
    readonly SVGNumber: typeof SVGNumber;
    readonly SVGNumberList: typeof SVGNumberList;
    readonly SVGPoint: typeof SVGPoint;
    readonly SVGPointList: typeof SVGPointList;
    readonly SVGPreserveAspectRatio: typeof SVGPreserveAspectRatio;
    readonly SVGRect: typeof SVGRect;
    readonly SVGStringList: typeof SVGStringList;
    readonly SVGTransform: typeof SVGTransform;
    readonly SVGTransformList: typeof SVGTransformList;
    readonly SVGAnimatedLengthList: typeof SVGAnimatedLengthList;
    readonly SVGUnitTypes: typeof SVGUnitTypes;
    readonly StylePropertyMap: typeof StylePropertyMap;
    readonly StylePropertyMapReadOnly: typeof StylePropertyMapReadOnly;
    readonly MediaList: typeof MediaList;
    readonly CSSKeywordValue: typeof CSSKeywordValue;
    readonly CSSStyleValue: typeof CSSStyleValue;
    readonly Window: typeof BrowserWindow;
    readonly URLSearchParams: {
        new (init?: string[][] | Record<string, string> | string | URLSearchParams): URLSearchParams;
        prototype: URLSearchParams;
    };
    readonly WritableStream: typeof Stream.Writable;
    readonly ReadableStream: {
        new (underlyingSource: import("node:stream/web").UnderlyingByteSource, strategy?: {
            highWaterMark?: number;
        }): ReadableStream<NodeJS.NonSharedUint8Array>;
        new <R = any>(underlyingSource: import("node:stream/web").UnderlyingDefaultSource<R>, strategy?: import("node:stream/web").QueuingStrategy<R>): ReadableStream<R>;
        new <R = any>(underlyingSource?: import("node:stream/web").UnderlyingSource<R>, strategy?: import("node:stream/web").QueuingStrategy<R>): ReadableStream<R>;
        prototype: ReadableStream;
        from<R = any>(iterable: Iterable<R> | AsyncIterable<R>): ReadableStream<R>;
    };
    readonly TransformStream: typeof Stream.Transform;
    readonly PerformanceObserver: {
        new (callback: import("node:perf_hooks").PerformanceObserverCallback): PerformanceObserver;
        prototype: PerformanceObserver;
        readonly supportedEntryTypes: readonly import("node:perf_hooks").EntryType[];
    };
    readonly PerformanceEntry: {
        new (): PerformanceEntry;
        prototype: PerformanceEntry;
    };
    readonly PerformanceObserverEntryList: new () => IPerformanceObserverEntryList;
    readonly document: Document;
    readonly customElements: CustomElementRegistry;
    readonly window: BrowserWindow;
    readonly globalThis: BrowserWindow;
    readonly performance: typeof performance;
    readonly screenLeft: number;
    readonly screenTop: number;
    readonly screenX: number;
    readonly screenY: number;
    readonly crypto: typeof webcrypto;
    readonly TextEncoder: typeof TextEncoder;
    readonly TextDecoder: typeof TextDecoder;
    readonly closed = false;
    console: IConsole;
    name: string;
    Array: typeof Array;
    ArrayBuffer: typeof ArrayBuffer;
    Boolean: typeof Boolean;
    Buffer: typeof Buffer;
    DataView: typeof DataView;
    Date: typeof Date;
    Error: typeof Error;
    EvalError: typeof EvalError;
    Float32Array: typeof Float32Array;
    Float64Array: typeof Float64Array;
    Function: typeof Function;
    Infinity: typeof Infinity;
    Int16Array: typeof Int16Array;
    Int32Array: typeof Int32Array;
    Int8Array: typeof Int8Array;
    Intl: typeof Intl;
    JSON: typeof JSON;
    Map: MapConstructor;
    Math: typeof Math;
    NaN: typeof NaN;
    Number: typeof Number;
    Object: typeof Object;
    Promise: typeof Promise;
    RangeError: typeof RangeError;
    ReferenceError: typeof ReferenceError;
    RegExp: typeof RegExp;
    Set: SetConstructor;
    String: typeof String;
    Symbol: Function;
    SyntaxError: typeof SyntaxError;
    TypeError: typeof TypeError;
    URIError: typeof URIError;
    Uint16Array: typeof Uint16Array;
    Uint32Array: typeof Uint32Array;
    Uint8Array: typeof Uint8Array;
    Uint8ClampedArray: typeof Uint8ClampedArray;
    WeakMap: WeakMapConstructor;
    WeakSet: WeakSetConstructor;
    decodeURI: typeof decodeURI;
    decodeURIComponent: typeof decodeURIComponent;
    encodeURI: typeof encodeURI;
    encodeURIComponent: typeof encodeURIComponent;
    eval: typeof eval;
    /**
     * @deprecated
     */
    escape: (str: string) => string;
    global: typeof globalThis;
    isFinite: typeof isFinite;
    isNaN: typeof isNaN;
    parseFloat: typeof parseFloat;
    parseInt: typeof parseInt;
    undefined: typeof undefined;
    /**
     * @deprecated
     */
    unescape: (str: string) => string;
    gc: () => void;
    v8debug?: unknown;
    [PropertySymbol.mutationObservers]: MutationObserver[];
    readonly [PropertySymbol.readyStateManager]: DocumentReadyStateManager;
    [PropertySymbol.location]: Location;
    [PropertySymbol.history]: History;
    [PropertySymbol.navigator]: Navigator;
    [PropertySymbol.screen]: Screen;
    [PropertySymbol.sessionStorage]: Storage;
    [PropertySymbol.localStorage]: Storage;
    [PropertySymbol.cookieStore]: CookieStore;
    [PropertySymbol.self]: BrowserWindow | null;
    [PropertySymbol.top]: BrowserWindow | null;
    [PropertySymbol.parent]: BrowserWindow | null;
    [PropertySymbol.window]: BrowserWindow;
    [PropertySymbol.frames]: BrowserWindow;
    [PropertySymbol.internalId]: number;
    [PropertySymbol.customElementReactionStack]: CustomElementReactionStack;
    [PropertySymbol.modules]: {
        json: Map<string, IModule>;
        css: Map<string, IModule>;
        esm: Map<string, IModule>;
    };
    [PropertySymbol.moduleImportMap]: IModuleImportMap | null;
    [PropertySymbol.openWebSockets]: WebSocket[];
    [PropertySymbol.propertyEventListeners]: Map<string, ((event: Event) => void) | null>;
    [PropertySymbol.querySelectorCache]: Map<string, Array<Array<SelectorItem>>>;
    /**
     * Constructor.
     *
     * @param browserFrame Browser frame.
     * @param [options] Options.
     * @param [options.url] URL.
     */
    constructor(browserFrame: IBrowserFrame, options?: {
        url?: string;
    });
    get onsearch(): ((event: Event) => void) | null;
    set onsearch(value: ((event: Event) => void) | null);
    get onappinstalled(): ((event: Event) => void) | null;
    set onappinstalled(value: ((event: Event) => void) | null);
    get onbeforeinstallprompt(): ((event: Event) => void) | null;
    set onbeforeinstallprompt(value: ((event: Event) => void) | null);
    get onabort(): ((event: Event) => void) | null;
    set onabort(value: ((event: Event) => void) | null);
    get onbeforeinput(): ((event: Event) => void) | null;
    set onbeforeinput(value: ((event: Event) => void) | null);
    get onbeforematch(): ((event: Event) => void) | null;
    set onbeforematch(value: ((event: Event) => void) | null);
    get onbeforetoggle(): ((event: Event) => void) | null;
    set onbeforetoggle(value: ((event: Event) => void) | null);
    get onblur(): ((event: Event) => void) | null;
    set onblur(value: ((event: Event) => void) | null);
    get oncancel(): ((event: Event) => void) | null;
    set oncancel(value: ((event: Event) => void) | null);
    get oncanplay(): ((event: Event) => void) | null;
    set oncanplay(value: ((event: Event) => void) | null);
    get oncanplaythrough(): ((event: Event) => void) | null;
    set oncanplaythrough(value: ((event: Event) => void) | null);
    get onchange(): ((event: Event) => void) | null;
    set onchange(value: ((event: Event) => void) | null);
    get onclick(): ((event: Event) => void) | null;
    set onclick(value: ((event: Event) => void) | null);
    get onclose(): ((event: Event) => void) | null;
    set onclose(value: ((event: Event) => void) | null);
    get oncommand(): ((event: Event) => void) | null;
    set oncommand(value: ((event: Event) => void) | null);
    get oncontentvisibilityautostatechange(): ((event: Event) => void) | null;
    set oncontentvisibilityautostatechange(value: ((event: Event) => void) | null);
    get oncontextlost(): ((event: Event) => void) | null;
    set oncontextlost(value: ((event: Event) => void) | null);
    get oncontextmenu(): ((event: Event) => void) | null;
    set oncontextmenu(value: ((event: Event) => void) | null);
    get oncontextrestored(): ((event: Event) => void) | null;
    set oncontextrestored(value: ((event: Event) => void) | null);
    get oncuechange(): ((event: Event) => void) | null;
    set oncuechange(value: ((event: Event) => void) | null);
    get ondblclick(): ((event: Event) => void) | null;
    set ondblclick(value: ((event: Event) => void) | null);
    get ondrag(): ((event: Event) => void) | null;
    set ondrag(value: ((event: Event) => void) | null);
    get ondragend(): ((event: Event) => void) | null;
    set ondragend(value: ((event: Event) => void) | null);
    get ondragenter(): ((event: Event) => void) | null;
    set ondragenter(value: ((event: Event) => void) | null);
    get ondragleave(): ((event: Event) => void) | null;
    set ondragleave(value: ((event: Event) => void) | null);
    get ondragover(): ((event: Event) => void) | null;
    set ondragover(value: ((event: Event) => void) | null);
    get ondragstart(): ((event: Event) => void) | null;
    set ondragstart(value: ((event: Event) => void) | null);
    get ondrop(): ((event: Event) => void) | null;
    set ondrop(value: ((event: Event) => void) | null);
    get ondurationchange(): ((event: Event) => void) | null;
    set ondurationchange(value: ((event: Event) => void) | null);
    get onemptied(): ((event: Event) => void) | null;
    set onemptied(value: ((event: Event) => void) | null);
    get onended(): ((event: Event) => void) | null;
    set onended(value: ((event: Event) => void) | null);
    get onerror(): ((event: Event) => void) | null;
    set onerror(value: ((event: Event) => void) | null);
    get onfocus(): ((event: Event) => void) | null;
    set onfocus(value: ((event: Event) => void) | null);
    get onformdata(): ((event: Event) => void) | null;
    set onformdata(value: ((event: Event) => void) | null);
    get oninput(): ((event: Event) => void) | null;
    set oninput(value: ((event: Event) => void) | null);
    get oninvalid(): ((event: Event) => void) | null;
    set oninvalid(value: ((event: Event) => void) | null);
    get onkeydown(): ((event: Event) => void) | null;
    set onkeydown(value: ((event: Event) => void) | null);
    get onkeypress(): ((event: Event) => void) | null;
    set onkeypress(value: ((event: Event) => void) | null);
    get onkeyup(): ((event: Event) => void) | null;
    set onkeyup(value: ((event: Event) => void) | null);
    get onload(): ((event: Event) => void) | null;
    set onload(value: ((event: Event) => void) | null);
    get onloadeddata(): ((event: Event) => void) | null;
    set onloadeddata(value: ((event: Event) => void) | null);
    get onloadedmetadata(): ((event: Event) => void) | null;
    set onloadedmetadata(value: ((event: Event) => void) | null);
    get onloadstart(): ((event: Event) => void) | null;
    set onloadstart(value: ((event: Event) => void) | null);
    get onmousedown(): ((event: Event) => void) | null;
    set onmousedown(value: ((event: Event) => void) | null);
    get onmouseenter(): ((event: Event) => void) | null;
    set onmouseenter(value: ((event: Event) => void) | null);
    get onmouseleave(): ((event: Event) => void) | null;
    set onmouseleave(value: ((event: Event) => void) | null);
    get onmousemove(): ((event: Event) => void) | null;
    set onmousemove(value: ((event: Event) => void) | null);
    get onmouseout(): ((event: Event) => void) | null;
    set onmouseout(value: ((event: Event) => void) | null);
    get onmouseover(): ((event: Event) => void) | null;
    set onmouseover(value: ((event: Event) => void) | null);
    get onmouseup(): ((event: Event) => void) | null;
    set onmouseup(value: ((event: Event) => void) | null);
    get onmousewheel(): ((event: Event) => void) | null;
    set onmousewheel(value: ((event: Event) => void) | null);
    get onpause(): ((event: Event) => void) | null;
    set onpause(value: ((event: Event) => void) | null);
    get onplay(): ((event: Event) => void) | null;
    set onplay(value: ((event: Event) => void) | null);
    get onplaying(): ((event: Event) => void) | null;
    set onplaying(value: ((event: Event) => void) | null);
    get onprogress(): ((event: Event) => void) | null;
    set onprogress(value: ((event: Event) => void) | null);
    get onratechange(): ((event: Event) => void) | null;
    set onratechange(value: ((event: Event) => void) | null);
    get onreset(): ((event: Event) => void) | null;
    set onreset(value: ((event: Event) => void) | null);
    get onresize(): ((event: Event) => void) | null;
    set onresize(value: ((event: Event) => void) | null);
    get onscroll(): ((event: Event) => void) | null;
    set onscroll(value: ((event: Event) => void) | null);
    get onscrollend(): ((event: Event) => void) | null;
    set onscrollend(value: ((event: Event) => void) | null);
    get onsecuritypolicyviolation(): ((event: Event) => void) | null;
    set onsecuritypolicyviolation(value: ((event: Event) => void) | null);
    get onseeked(): ((event: Event) => void) | null;
    set onseeked(value: ((event: Event) => void) | null);
    get onseeking(): ((event: Event) => void) | null;
    set onseeking(value: ((event: Event) => void) | null);
    get onselect(): ((event: Event) => void) | null;
    set onselect(value: ((event: Event) => void) | null);
    get onslotchange(): ((event: Event) => void) | null;
    set onslotchange(value: ((event: Event) => void) | null);
    get onstalled(): ((event: Event) => void) | null;
    set onstalled(value: ((event: Event) => void) | null);
    get onsubmit(): ((event: Event) => void) | null;
    set onsubmit(value: ((event: Event) => void) | null);
    get onsuspend(): ((event: Event) => void) | null;
    set onsuspend(value: ((event: Event) => void) | null);
    get ontimeupdate(): ((event: Event) => void) | null;
    set ontimeupdate(value: ((event: Event) => void) | null);
    get ontoggle(): ((event: Event) => void) | null;
    set ontoggle(value: ((event: Event) => void) | null);
    get onvolumechange(): ((event: Event) => void) | null;
    set onvolumechange(value: ((event: Event) => void) | null);
    get onwaiting(): ((event: Event) => void) | null;
    set onwaiting(value: ((event: Event) => void) | null);
    get onwebkitanimationend(): ((event: Event) => void) | null;
    set onwebkitanimationend(value: ((event: Event) => void) | null);
    get onwebkitanimationiteration(): ((event: Event) => void) | null;
    set onwebkitanimationiteration(value: ((event: Event) => void) | null);
    get onwebkitanimationstart(): ((event: Event) => void) | null;
    set onwebkitanimationstart(value: ((event: Event) => void) | null);
    get onwebkittransitionend(): ((event: Event) => void) | null;
    set onwebkittransitionend(value: ((event: Event) => void) | null);
    get onwheel(): ((event: Event) => void) | null;
    set onwheel(value: ((event: Event) => void) | null);
    get onauxclick(): ((event: Event) => void) | null;
    set onauxclick(value: ((event: Event) => void) | null);
    get ongotpointercapture(): ((event: Event) => void) | null;
    set ongotpointercapture(value: ((event: Event) => void) | null);
    get onlostpointercapture(): ((event: Event) => void) | null;
    set onlostpointercapture(value: ((event: Event) => void) | null);
    get onpointerdown(): ((event: Event) => void) | null;
    set onpointerdown(value: ((event: Event) => void) | null);
    get onpointermove(): ((event: Event) => void) | null;
    set onpointermove(value: ((event: Event) => void) | null);
    get onpointerup(): ((event: Event) => void) | null;
    set onpointerup(value: ((event: Event) => void) | null);
    get onpointercancel(): ((event: Event) => void) | null;
    set onpointercancel(value: ((event: Event) => void) | null);
    get onpointerover(): ((event: Event) => void) | null;
    set onpointerover(value: ((event: Event) => void) | null);
    get onpointerout(): ((event: Event) => void) | null;
    set onpointerout(value: ((event: Event) => void) | null);
    get onpointerenter(): ((event: Event) => void) | null;
    set onpointerenter(value: ((event: Event) => void) | null);
    get onpointerleave(): ((event: Event) => void) | null;
    set onpointerleave(value: ((event: Event) => void) | null);
    get onselectstart(): ((event: Event) => void) | null;
    set onselectstart(value: ((event: Event) => void) | null);
    get onselectionchange(): ((event: Event) => void) | null;
    set onselectionchange(value: ((event: Event) => void) | null);
    get onanimationcancel(): ((event: Event) => void) | null;
    set onanimationcancel(value: ((event: Event) => void) | null);
    get onanimationend(): ((event: Event) => void) | null;
    set onanimationend(value: ((event: Event) => void) | null);
    get onanimationiteration(): ((event: Event) => void) | null;
    set onanimationiteration(value: ((event: Event) => void) | null);
    get onanimationstart(): ((event: Event) => void) | null;
    set onanimationstart(value: ((event: Event) => void) | null);
    get ontransitionrun(): ((event: Event) => void) | null;
    set ontransitionrun(value: ((event: Event) => void) | null);
    get ontransitionstart(): ((event: Event) => void) | null;
    set ontransitionstart(value: ((event: Event) => void) | null);
    get ontransitionend(): ((event: Event) => void) | null;
    set ontransitionend(value: ((event: Event) => void) | null);
    get ontransitioncancel(): ((event: Event) => void) | null;
    set ontransitioncancel(value: ((event: Event) => void) | null);
    get onbeforexrselect(): ((event: Event) => void) | null;
    set onbeforexrselect(value: ((event: Event) => void) | null);
    get onafterprint(): ((event: Event) => void) | null;
    set onafterprint(value: ((event: Event) => void) | null);
    get onbeforeprint(): ((event: Event) => void) | null;
    set onbeforeprint(value: ((event: Event) => void) | null);
    get onbeforeunload(): ((event: Event) => void) | null;
    set onbeforeunload(value: ((event: Event) => void) | null);
    get onhashchange(): ((event: Event) => void) | null;
    set onhashchange(value: ((event: Event) => void) | null);
    get onlanguagechange(): ((event: Event) => void) | null;
    set onlanguagechange(value: ((event: Event) => void) | null);
    get onmessage(): ((event: Event) => void) | null;
    set onmessage(value: ((event: Event) => void) | null);
    get onmessageerror(): ((event: Event) => void) | null;
    set onmessageerror(value: ((event: Event) => void) | null);
    get onoffline(): ((event: Event) => void) | null;
    set onoffline(value: ((event: Event) => void) | null);
    get ononline(): ((event: Event) => void) | null;
    set ononline(value: ((event: Event) => void) | null);
    get onpagehide(): ((event: Event) => void) | null;
    set onpagehide(value: ((event: Event) => void) | null);
    get onpageshow(): ((event: Event) => void) | null;
    set onpageshow(value: ((event: Event) => void) | null);
    get onpopstate(): ((event: Event) => void) | null;
    set onpopstate(value: ((event: Event) => void) | null);
    get onrejectionhandled(): ((event: Event) => void) | null;
    set onrejectionhandled(value: ((event: Event) => void) | null);
    get onstorage(): ((event: Event) => void) | null;
    set onstorage(value: ((event: Event) => void) | null);
    get onunhandledrejection(): ((event: Event) => void) | null;
    set onunhandledrejection(value: ((event: Event) => void) | null);
    get onunload(): ((event: Event) => void) | null;
    set onunload(value: ((event: Event) => void) | null);
    get ondevicemotion(): ((event: Event) => void) | null;
    set ondevicemotion(value: ((event: Event) => void) | null);
    get ondeviceorientation(): ((event: Event) => void) | null;
    set ondeviceorientation(value: ((event: Event) => void) | null);
    get ondeviceorientationabsolute(): ((event: Event) => void) | null;
    set ondeviceorientationabsolute(value: ((event: Event) => void) | null);
    get onpointerrawupdate(): ((event: Event) => void) | null;
    set onpointerrawupdate(value: ((event: Event) => void) | null);
    get onpageswap(): ((event: Event) => void) | null;
    set onpageswap(value: ((event: Event) => void) | null);
    get onpagereveal(): ((event: Event) => void) | null;
    set onpagereveal(value: ((event: Event) => void) | null);
    get onscrollsnapchange(): ((event: Event) => void) | null;
    set onscrollsnapchange(value: ((event: Event) => void) | null);
    get onscrollsnapchanging(): ((event: Event) => void) | null;
    set onscrollsnapchanging(value: ((event: Event) => void) | null);
    get ongamepadconnected(): ((event: Event) => void) | null;
    set ongamepadconnected(value: ((event: Event) => void) | null);
    get ongamepaddisconnected(): ((event: Event) => void) | null;
    set ongamepaddisconnected(value: ((event: Event) => void) | null);
    /**
     * Returns self.
     *
     * @returns Self.
     */
    get self(): BrowserWindow;
    /**
     * Sets self.
     *
     * @param self Self.
     */
    set self(self: BrowserWindow | null);
    /**
     * Returns top.
     *
     * @returns Top.
     */
    get top(): BrowserWindow;
    /**
     * Returns parent.
     *
     * @returns Parent.
     */
    get parent(): BrowserWindow;
    /**
     * Sets parent.
     *
     * @param parent Parent.
     */
    set parent(parent: BrowserWindow | null);
    /**
     * Returns frames.
     *
     * @returns Frames.
     */
    get frames(): BrowserWindow;
    /**
     * Sets frames.
     *
     * @param frames Frames.
     */
    set frames(frames: BrowserWindow | null);
    /**
     * Returns location.
     */
    get location(): Location;
    /**
     * Returns location.
     *
     * @param href Href.
     */
    set location(href: string);
    /**
     * Returns history.
     */
    get history(): History;
    /**
     * Returns navigator.
     */
    get navigator(): Navigator;
    /**
     * Returns screen.
     */
    get screen(): Screen;
    /**
     * Returns session storage.
     */
    get sessionStorage(): Storage;
    /**
     * Returns local storage.
     */
    get localStorage(): Storage;
    /**
     * Returns cookie store.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/cookieStore
     */
    get cookieStore(): CookieStore;
    /**
     * Returns opener.
     *
     * @returns Opener.
     */
    get opener(): BrowserWindow | CrossOriginBrowserWindow | null;
    /**
     * The number of pixels that the document is currently scrolled horizontally.
     *
     * @returns Scroll X.
     */
    get scrollX(): number;
    /**
     * The read-only Window property pageXOffset is an alias for scrollX.
     *
     * @returns Scroll X.
     */
    get pageXOffset(): number;
    /**
     * The number of pixels that the document is currently scrolled vertically.
     *
     * @returns Scroll Y.
     */
    get scrollY(): number;
    /**
     * The read-only Window property pageYOffset is an alias for scrollY.
     *
     * @returns Scroll Y.
     */
    get pageYOffset(): number;
    /**
     * The CSS interface holds useful CSS-related methods.
     *
     * @returns CSS interface.
     */
    get CSS(): CSS;
    /**
     * Returns inner width.
     *
     * @returns Inner width.
     */
    get innerWidth(): number;
    /**
     * Sets inner width.
     *
     * @param value Inner width.
     */
    set innerWidth(value: number);
    /**
     * Returns inner height.
     *
     * @returns Inner height.
     */
    get innerHeight(): number;
    /**
     * Sets inner height.
     *
     * @param value Inner height.
     */
    set innerHeight(value: number);
    /**
     * Returns outer width.
     *
     * @returns Outer width.
     */
    get outerWidth(): number;
    /**
     * Sets outer width.
     *
     * @param value Outer width.
     */
    set outerWidth(value: number);
    /**
     * Returns outer height.
     *
     * @returns Outer height.
     */
    get outerHeight(): number;
    /**
     * Sets outer height.
     *
     * @param value Outer height.
     */
    set outerHeight(value: number);
    /**
     * Returns device pixel ratio.
     *
     * @returns Device pixel ratio.
     */
    get devicePixelRatio(): number;
    /**
     * Sets device pixel ratio.
     *
     * @param value Device pixel ratio.
     */
    set devicePixelRatio(value: number);
    /**
     * Returns an object containing the values of all CSS properties of an element.
     *
     * @param element Element.
     * @returns CSS style declaration.
     */
    getComputedStyle(element: Element): CSSStyleDeclaration;
    /**
     * Returns selection.
     *
     * @returns Selection.
     */
    getSelection(): Selection;
    /**
     * Scrolls to a particular set of coordinates.
     *
     * @param x X position or options object.
     * @param y Y position.
     */
    scroll(x: IScrollToOptions | number, y?: number): void;
    /**
     * Scrolls to a particular set of coordinates.
     *
     * @param x X position or options object.
     * @param y Y position.
     */
    scrollTo(x: IScrollToOptions | number, y?: number): void;
    /**
     * Scrolls by a relative amount from the current position.
     *
     * @param x Pixels to scroll by from top or scroll options object.
     * @param y Pixels to scroll by from left.
     */
    scrollBy(x: IScrollToOptions | number, y?: number): void;
    /**
     * Shifts focus away from the window.
     */
    blur(): void;
    /**
     * Gives focus to the window.
     */
    focus(): void;
    /**
     * Loads a specified resource into a new or existing browsing context (that is, a tab, a window, or an iframe) under a specified name.
     *
     * @param [url] URL.
     * @param [target] Target.
     * @param [features] Window features.
     * @returns Window.
     */
    open(url?: string, target?: string, features?: string): BrowserWindow | CrossOriginBrowserWindow | null;
    /**
     * Closes the window.
     */
    close(): void;
    /**
     * Returns a new MediaQueryList object that can then be used to determine if the document matches the media query string.
     *
     * @param mediaQueryString A string specifying the media query to parse into a MediaQueryList.
     * @returns A new MediaQueryList.
     */
    matchMedia(mediaQueryString: string): MediaQueryList;
    /**
     * Returns a promise that fulfills with a ScreenDetails object instance.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/getScreenDetails
     * @returns A Promise that fulfills with a ScreenDetails object instance.
     */
    getScreenDetails(): Promise<ScreenDetails>;
    /**
     * Sets a timer which executes a function once the timer expires.
     *
     * @param callback Function to be executed.
     * @param [delay=0] Delay in ms.
     * @param args Arguments passed to the callback function.
     * @returns Timeout ID.
     */
    setTimeout(callback: Function, delay?: number, ...args: unknown[]): NodeJS.Timeout;
    /**
     * Cancels a timeout previously established by calling setTimeout().
     *
     * @param id ID of the timeout.
     */
    clearTimeout(id: NodeJS.Timeout): void;
    /**
     * Calls a function with a fixed time delay between each call.
     *
     * @param callback Function to be executed.
     * @param [delay=0] Delay in ms.
     * @param args Arguments passed to the callback function.
     * @returns Interval ID.
     */
    setInterval(callback: Function, delay?: number, ...args: unknown[]): NodeJS.Timeout;
    /**
     * Cancels a timed repeating action which was previously established by a call to setInterval().
     *
     * @param id ID of the interval.
     */
    clearInterval(id: NodeJS.Timeout): void;
    /**
     * Mock animation frames with timeouts.
     *
     * @param callback Callback.
     * @returns ID.
     */
    requestAnimationFrame(callback: (timestamp: number) => void): NodeJS.Immediate;
    /**
     * Mock animation frames with timeouts.
     *
     * @param id ID.
     */
    cancelAnimationFrame(id: NodeJS.Immediate): void;
    /**
     * Queues a microtask to be executed at a safe time prior to control returning to the browser's event loop.
     *
     * @param callback Function to be executed.
     */
    queueMicrotask(callback: Function): void;
    /**
     * This method provides an easy, logical way to fetch resources asynchronously across the network.
     *
     * @param url URL.
     * @param [init] Init.
     * @returns Promise.
     */
    fetch(url: TRequestInfo, init?: IRequestInit): Promise<Response>;
    /**
     * Creates a Base64-encoded ASCII string from a binary string (i.e., a string in which each character in the string is treated as a byte of binary data).
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/btoa
     * @param data Binay data.
     * @returns Base64-encoded string.
     */
    btoa(data: unknown): string;
    /**
     * Decodes a string of data which has been encoded using Base64 encoding.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/atob
     * @see https://infra.spec.whatwg.org/#forgiving-base64-encode.
     * @see Https://html.spec.whatwg.org/multipage/webappapis.html#btoa.
     * @param data Binay string.
     * @returns An ASCII string containing decoded data from encodedData.
     */
    atob(data: unknown): string;
    /**
     * Safely enables cross-origin communication between Window objects; e.g., between a page and a pop-up that it spawned, or between a page and an iframe embedded within it.
     *
     * @param message Message.
     * @param [targetOrigin=*] Target origin.
     * @param _transfer Transfer. Not implemented.
     */
    postMessage(message: unknown, targetOrigin?: string, _transfer?: unknown[]): void;
    /**
     * Resizes the window.
     *
     * @param width Width.
     * @param height Height.
     */
    resizeTo(width: number, height: number): void;
    /**
     * Resizes the current window by a specified amount.
     *
     * @param width Width.
     * @param height Height.
     */
    resizeBy(width: number, height: number): void;
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
    createImageBitmap(source: TImageBitmapSource, sx?: number | IImageBitmapOptions, sy?: number, sw?: number | IImageBitmapOptions, sh?: number, options?: IImageBitmapOptions): Promise<ImageBitmap>;
    /**
     * Dispatches an error event and outputs the error to the console.
     *
     * @param error Error.
     */
    [PropertySymbol.dispatchError](error: Error): void;
    /**
     * Evaluates code in a VM context.
     *
     * @param code Code.
     * @param [options] Options.
     * @param [options.filename] Filename.
     * @returns any.
     */
    [PropertySymbol.evaluateScript](code: string, options?: {
        filename?: string;
    }): any;
    /**
     * Setup of VM context.
     */
    protected [PropertySymbol.setupVMContext](): void;
    /**
     * Checks if the JavaScript execution environment is secure and outputs a warning if not.
     */
    protected [PropertySymbol.validateJavaScriptExecutionEnvironment](): void;
    /**
     * @override
     */
    [PropertySymbol.destroy](): void;
    /**
     * Binds methods to a window as scope.
     */
    [PropertySymbol.bindMethods](): void;
}
//# sourceMappingURL=BrowserWindow.d.ts.map