import type Element from '../nodes/element/Element.js';
import SelectorCombinatorEnum from './SelectorCombinatorEnum.js';
import type ISelectorAttribute from './ISelectorAttribute.js';
import type ISelectorMatch from './ISelectorMatch.js';
import type ISelectorPseudo from './ISelectorPseudo.js';
import type DocumentFragment from '../nodes/document-fragment/DocumentFragment.js';
/**
 * Selector item.
 */
export default class SelectorItem {
    tagName: string | null;
    id: string | null;
    classNames: string[] | null;
    attributes: ISelectorAttribute[] | null;
    pseudos: ISelectorPseudo[] | null;
    isPseudoElement: boolean;
    combinator: SelectorCombinatorEnum;
    /**
     * Constructor.
     *
     * @param [options] Options.
     * @param [options.combinator] Combinator.
     * @param [options.tagName] Tag name.
     * @param [options.id] ID.
     * @param [options.classNames] Class names.
     * @param [options.attributes] Attributes.
     * @param [options.pseudos] Pseudos.
     * @param [options.isPseudoElement] Is pseudo element.
     * @param [options.ignoreErrors] Ignore errors.
     */
    constructor(options?: {
        tagName?: string;
        id?: string;
        classNames?: string[];
        attributes?: ISelectorAttribute[];
        pseudos?: ISelectorPseudo[];
        isPseudoElement?: boolean;
        combinator?: SelectorCombinatorEnum;
    });
    /**
     * Matches a selector against an element.
     *
     * @param scope Scope.
     * @param element HTML element.
     * @param [ignoreErrors] Ignores errors.
     * @returns Result.
     */
    match(scope: Element | DocumentFragment | null, element: Element, ignoreErrors?: boolean): ISelectorMatch | null;
    /**
     * Matches a pseudo selector.
     *
     * @param scope Scope.
     * @param element Element.
     * @param [ignoreErrors] Ignores errors.
     * @returns Result.
     */
    private matchPseudo;
    /**
     * Matches a pseudo selector.
     *
     * @param scope Scope.
     * @param element Element.
     * @param parentChildren Parent children.
     * @param pseudo Pseudo.
     * @param [ignoreErrors] Ignores errors.
     */
    private matchPseudoItem;
    /**
     * Matches attribute.
     *
     * @param element Element.
     * @returns Result.
     */
    private matchAttributes;
    /**
     * Matches class.
     *
     * @param element Element.
     * @returns Result.
     */
    private matchClass;
    /**
     * Matches a selector item against children of an element.
     *
     * @param scope Scope.
     * @param selectorItem Selector item.
     * @param element Element.
     * @param [ignoreErrors] Ignores errors.
     * @returns Result.
     */
    private matchChildOfElement;
    /**
     * Returns the selector string.
     *
     * @returns Selector string.
     */
    private getSelectorString;
    /**
     * Returns the root element.
     *
     * @param scope Scope.
     * @returns Root element.
     */
    private getRootElement;
}
//# sourceMappingURL=SelectorItem.d.ts.map