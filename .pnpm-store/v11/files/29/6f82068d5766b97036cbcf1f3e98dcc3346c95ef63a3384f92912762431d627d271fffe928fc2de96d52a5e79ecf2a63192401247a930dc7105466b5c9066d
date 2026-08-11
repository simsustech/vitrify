import DocumentType from '../nodes/document-type/DocumentType.js';
import * as PropertySymbol from '../PropertySymbol.js';
import NodeFactory from '../nodes/NodeFactory.js';
/**
 * The DOMImplementation interface represents an object providing methods which are not dependent on any particular document. Such an object is returned by the.
 */
export default class DOMImplementation {
    #document;
    /**
     * Constructor.
     *
     * @param document Document.
     */
    constructor(document) {
        this.#document = document;
    }
    /**
     * Creates and returns an XML Document.
     *
     * TODO: Not fully implemented.
     *
     * @param _namespaceURI Namespace URI.
     * @param qualifiedName Qualified name.
     * @param [_docType] Document type.
     */
    createDocument(_namespaceURI, qualifiedName, _docType) {
        if (arguments.length < 2) {
            throw new this.#document[PropertySymbol.window].TypeError(`Failed to execute 'createDocument' on 'DOMImplementation': 2 arguments required, but only ${arguments.length} present.`);
        }
        // The spec declares "qualifiedName" as "[LegacyNullToEmptyString] DOMString",
        // so "null" is coerced to an empty string instead of being rejected.
        qualifiedName = qualifiedName === null ? '' : String(qualifiedName);
        switch (qualifiedName.split(':').pop()) {
            case 'svg':
            case 'xml':
                return new this.#document[PropertySymbol.window].XMLDocument();
            default:
                return new this.#document[PropertySymbol.window].HTMLDocument();
        }
    }
    /**
     * Creates and returns an HTML Document.
     */
    createHTMLDocument() {
        return new this.#document[PropertySymbol.window].HTMLDocument();
    }
    /**
     * Creates and returns an HTML Document.
     *
     * @param qualifiedName Qualified name.
     * @param publicId Public ID.
     * @param systemId System ID.
     */
    createDocumentType(qualifiedName, publicId, systemId) {
        const documentType = NodeFactory.createNode(this.#document, DocumentType);
        documentType[PropertySymbol.name] = qualifiedName;
        documentType[PropertySymbol.publicId] = publicId;
        documentType[PropertySymbol.systemId] = systemId;
        return documentType;
    }
}
//# sourceMappingURL=DOMImplementation.js.map