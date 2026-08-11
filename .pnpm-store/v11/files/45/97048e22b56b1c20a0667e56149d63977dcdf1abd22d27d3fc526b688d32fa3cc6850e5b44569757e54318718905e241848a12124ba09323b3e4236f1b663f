import * as PropertySymbol from '../PropertySymbol.js';
import NodeList from '../nodes/node/NodeList.js';
import NodeTypeEnum from '../nodes/node/NodeTypeEnum.js';
import SelectorCombinatorEnum from './SelectorCombinatorEnum.js';
import SelectorParser from './SelectorParser.js';
/**
 * Invalid Selector RegExp.
 */
const INVALID_SELECTOR_REGEXP = /^[.#\[]?\d|[.#]$/;
/**
 * Utility for query selection in an HTML element.
 *
 * @class QuerySelector
 */
export default class QuerySelector {
    /**
     * Finds elements based on a query selector.
     *
     * @param node Node to search in.
     * @param selector Selector.
     * @returns HTML elements.
     */
    static querySelectorAll(node, selector) {
        const window = node[PropertySymbol.window];
        if (selector === '') {
            throw new window.DOMException(`Failed to execute 'querySelectorAll' on '${node.constructor.name}': The provided selector is empty.`);
        }
        if (typeof selector === 'function') {
            throw new window.DOMException(`Failed to execute 'querySelectorAll' on '${node.constructor.name}': '${selector}' is not a valid selector.`);
        }
        if (typeof selector === 'symbol') {
            throw new window.TypeError(`Failed to execute 'querySelectorAll' on '${node.constructor.name}': Cannot convert a Symbol value to a string`);
        }
        selector = String(selector);
        if (INVALID_SELECTOR_REGEXP.test(selector)) {
            throw new window.DOMException(`Failed to execute 'querySelectorAll' on '${node.constructor.name}': '${selector}' is not a valid selector.`);
        }
        const cache = node[PropertySymbol.cache].querySelectorAll;
        const cachedResult = cache.get(selector);
        if (cachedResult) {
            if (cachedResult.result !== null) {
                const result = cachedResult.result.deref();
                if (result) {
                    return result;
                }
            }
            cache.delete(selector);
        }
        const scope = node[PropertySymbol.nodeType] === NodeTypeEnum.documentNode
            ? node.documentElement
            : node;
        const groups = new SelectorParser({ window, scope }).getSelectorGroups(selector);
        const items = [];
        const nodeList = new NodeList(PropertySymbol.illegalConstructor, items);
        const matchesMap = new Map();
        const matchedPositions = [];
        const cachedItem = {
            result: new WeakRef(nodeList)
        };
        node[PropertySymbol.cache].querySelectorAll.set(selector, cachedItem);
        if (node[PropertySymbol.isConnected]) {
            // Document is affected for the ":target" selector
            (node[PropertySymbol.ownerDocument] || node)[PropertySymbol.affectsCache].push(cachedItem);
        }
        for (const selectorItems of groups) {
            const rootElement = node[PropertySymbol.nodeType] === NodeTypeEnum.elementNode ? node : null;
            const children = node[PropertySymbol.nodeType] === NodeTypeEnum.elementNode
                ? [node]
                : node[PropertySymbol.elementArray];
            const matches = this.findAll({ scope, rootElement, children, selectorItems, cachedItem });
            for (const match of matches) {
                if (!matchesMap.has(match.documentPosition)) {
                    matchesMap.set(match.documentPosition, match.element);
                    matchedPositions.push(match.documentPosition);
                }
            }
        }
        const keys = matchedPositions.sort();
        for (let i = 0, max = keys.length; i < max; i++) {
            items.push(matchesMap.get(keys[i]));
        }
        return nodeList;
    }
    /**
     * Finds an element based on a query selector.
     *
     * @param node Node to search in.
     * @param selector Selector.
     * @returns HTML element.
     */
    static querySelector(node, selector) {
        const window = node[PropertySymbol.window];
        if (selector === '') {
            throw new window.DOMException(`Failed to execute 'querySelector' on '${node.constructor.name}': The provided selector is empty.`);
        }
        if (typeof selector === 'function') {
            throw new window.DOMException(`Failed to execute 'querySelector' on '${node.constructor.name}': '${selector}' is not a valid selector.`);
        }
        if (typeof selector === 'symbol') {
            throw new window.TypeError(`Failed to execute 'querySelector' on '${node.constructor.name}': Cannot convert a Symbol value to a string`);
        }
        selector = String(selector);
        if (INVALID_SELECTOR_REGEXP.test(selector)) {
            throw new window.DOMException(`Failed to execute 'querySelector' on '${node.constructor.name}': '${selector}' is not a valid selector.`);
        }
        const cachedResult = node[PropertySymbol.cache].querySelector.get(selector);
        if (cachedResult) {
            if (cachedResult.result !== null) {
                if (!cachedResult.result.element) {
                    return null;
                }
                const result = cachedResult.result.element.deref();
                if (result) {
                    return result;
                }
            }
            node[PropertySymbol.cache].querySelector.delete(selector);
        }
        const cachedItem = {
            result: { element: null }
        };
        node[PropertySymbol.cache].querySelector.set(selector, cachedItem);
        if (node[PropertySymbol.isConnected]) {
            // Document is affected for the ":target" selector
            (node[PropertySymbol.ownerDocument] || node)[PropertySymbol.affectsCache].push(cachedItem);
        }
        let bestMatch = null;
        const matchesMap = new Map();
        const scope = node[PropertySymbol.nodeType] === NodeTypeEnum.documentNode
            ? node.documentElement
            : node;
        for (const selectorItems of new SelectorParser({ window, scope }).getSelectorGroups(selector)) {
            const rootElement = node[PropertySymbol.nodeType] === NodeTypeEnum.elementNode ? node : null;
            const children = node[PropertySymbol.nodeType] === NodeTypeEnum.elementNode
                ? [node]
                : node[PropertySymbol.elementArray];
            const match = this.findFirst({ scope, rootElement, children, selectorItems, cachedItem });
            if (match && !matchesMap.has(match.documentPosition)) {
                matchesMap.set(match.documentPosition, true);
                if (!bestMatch || match.documentPosition < bestMatch.documentPosition) {
                    bestMatch = match;
                }
            }
        }
        const element = bestMatch?.element || null;
        cachedItem.result = { element: element ? new WeakRef(element) : null };
        return element;
    }
    /**
     * Checks if an element matches a selector and returns priority weight.
     *
     * @param element Element to match.
     * @param selector Selector to match with.
     * @param [options] Options.
     * @param [options.scope] Scope.
     * @param [options.ignoreErrors] Ignores errors.
     * @returns Result.
     */
    static matches(element, selector, options) {
        const ignoreErrors = options?.ignoreErrors;
        const window = element[PropertySymbol.window];
        if (selector === '*') {
            return {
                priorityWeight: 1
            };
        }
        if (selector === '') {
            if (ignoreErrors) {
                return null;
            }
            throw new window.DOMException(`Failed to execute 'matches' on '${element.constructor.name}': The provided selector is empty.`);
        }
        if (typeof selector === 'function') {
            if (ignoreErrors) {
                return null;
            }
            throw new window.DOMException(`Failed to execute 'matches' on '${element.constructor.name}': '${selector}' is not a valid selector.`);
        }
        if (typeof selector === 'symbol') {
            if (ignoreErrors) {
                return null;
            }
            throw new window.TypeError(`Cannot convert a Symbol value to a string`);
        }
        selector = String(selector);
        if (INVALID_SELECTOR_REGEXP.test(selector)) {
            if (ignoreErrors) {
                return null;
            }
            throw new window.DOMException(`Failed to execute 'matches' on '${element.constructor.name}': '${selector}' is not a valid selector.`);
        }
        const cachedResult = element[PropertySymbol.cache].matches.get(selector);
        if (cachedResult) {
            if (cachedResult.result !== null) {
                return cachedResult.result.match;
            }
            element[PropertySymbol.cache].matches.delete(selector);
        }
        const cachedItem = {
            result: { match: null }
        };
        element[PropertySymbol.cache].matches.set(selector, cachedItem);
        if (element[PropertySymbol.isConnected]) {
            // Document is affected for the ":target" selector
            (element[PropertySymbol.ownerDocument] || element)[PropertySymbol.affectsCache].push(cachedItem);
        }
        const scopeOrElement = options?.scope || element;
        const scope = scopeOrElement[PropertySymbol.nodeType] === NodeTypeEnum.documentNode
            ? scopeOrElement.documentElement
            : scopeOrElement;
        for (const items of new SelectorParser({
            ignoreErrors: options?.ignoreErrors,
            window,
            scope
        }).getSelectorGroups(selector)) {
            const result = this.matchSelector({
                scope,
                element,
                selectorItems: items.slice().reverse(),
                cachedItem,
                ignoreErrors
            });
            if (result) {
                cachedItem.result.match = result;
                return result;
            }
        }
        return null;
    }
    /**
     * Checks if a node matches a selector.
     *
     * @param options Options.
     * @param options.scope Scope.
     * @param options.element Target element.
     * @param options.currentElement
     * @param options.selectorItems Selector items.
     * @param options.cachedItem Cached item.
     * @param [options.ignoreErrors] Ignores errors.
     * @param [previousSelectorItem] Previous selector item.
     * @param [priorityWeight] Priority weight.
     * @returns Result.
     */
    static matchSelector(options, previousSelectorItem = null, priorityWeight = 0) {
        const { scope, element, selectorItems, cachedItem, ignoreErrors } = options;
        const selectorItem = selectorItems[0];
        if (!selectorItem) {
            return null;
        }
        const result = selectorItem.match(scope, element, ignoreErrors);
        if (result) {
            if (selectorItems.length === 1) {
                return {
                    priorityWeight: priorityWeight + result.priorityWeight
                };
            }
            switch (selectorItem.combinator) {
                case SelectorCombinatorEnum.adjacentSibling:
                    const previousElementSibling = element.previousElementSibling;
                    if (previousElementSibling) {
                        previousElementSibling[PropertySymbol.affectsCache].push(cachedItem);
                        const match = this.matchSelector({
                            scope,
                            element: previousElementSibling,
                            selectorItems: selectorItems.slice(1),
                            cachedItem: cachedItem,
                            ignoreErrors
                        }, selectorItem, priorityWeight + result.priorityWeight);
                        if (match) {
                            return match;
                        }
                    }
                    break;
                case SelectorCombinatorEnum.none:
                case SelectorCombinatorEnum.child:
                case SelectorCombinatorEnum.descendant:
                    const parentElement = element.parentElement;
                    if (parentElement) {
                        parentElement[PropertySymbol.affectsCache].push(cachedItem);
                        const match = this.matchSelector({
                            scope,
                            element: parentElement,
                            selectorItems: selectorItems.slice(1),
                            cachedItem: cachedItem,
                            ignoreErrors
                        }, selectorItem, priorityWeight + result.priorityWeight);
                        if (match) {
                            return match;
                        }
                    }
                    break;
                case SelectorCombinatorEnum.subsequentSibling:
                    const siblingParentElement = element.parentElement;
                    if (siblingParentElement) {
                        const siblings = siblingParentElement[PropertySymbol.elementArray];
                        const index = siblings.indexOf(element);
                        siblingParentElement[PropertySymbol.affectsCache].push(cachedItem);
                        for (let i = index - 1; i >= 0; i--) {
                            const sibling = siblings[i];
                            sibling[PropertySymbol.affectsCache].push(cachedItem);
                            const match = this.matchSelector({
                                scope,
                                element: sibling,
                                selectorItems: selectorItems.slice(1),
                                cachedItem: cachedItem,
                                ignoreErrors
                            }, selectorItem, priorityWeight + result.priorityWeight);
                            if (match) {
                                return match;
                            }
                        }
                    }
                    break;
            }
        }
        if (previousSelectorItem?.combinator === SelectorCombinatorEnum.none ||
            previousSelectorItem?.combinator === SelectorCombinatorEnum.descendant) {
            const parentElement = element.parentElement;
            if (parentElement) {
                return this.matchSelector({
                    scope,
                    element: parentElement,
                    selectorItems: selectorItems,
                    cachedItem: cachedItem,
                    ignoreErrors
                }, previousSelectorItem, priorityWeight);
            }
        }
        return null;
    }
    /**
     * Finds elements based on a query selector for a part of a list of selectors separated with comma.
     *
     * @param options Options.
     * @param options.scope Scope.
     * @param options.rootElement Root element.
     * @param options.children Child elements.
     * @param options.selectorItems Selector items.
     * @param options.cachedItem Cached item.
     * @param [documentPosition] Document position of the element.
     * @returns Document position and element map.
     */
    static findAll(options, documentPosition) {
        const { scope, rootElement, children, selectorItems, cachedItem } = options;
        const selectorItem = selectorItems[0];
        const nextSelectorItem = selectorItems[1];
        let matched = [];
        if (!selectorItem) {
            return [];
        }
        for (let i = 0, max = children.length; i < max; i++) {
            const child = children[i];
            const childrenOfChild = child[PropertySymbol.elementArray];
            const position = (documentPosition ? documentPosition + '>' : '') + String.fromCharCode(i);
            child[PropertySymbol.affectsCache].push(cachedItem);
            if (selectorItem.match(scope, child)) {
                if (!nextSelectorItem) {
                    if (rootElement !== child) {
                        matched.push({
                            documentPosition: position,
                            element: child
                        });
                    }
                }
                else {
                    switch (nextSelectorItem.combinator) {
                        case SelectorCombinatorEnum.adjacentSibling:
                            const nextElementSibling = child.nextElementSibling;
                            if (nextElementSibling) {
                                matched = matched.concat(this.findAll({
                                    scope,
                                    rootElement,
                                    children: [nextElementSibling],
                                    selectorItems: selectorItems.slice(1),
                                    cachedItem: cachedItem
                                }, position));
                            }
                            break;
                        case SelectorCombinatorEnum.none:
                        case SelectorCombinatorEnum.descendant:
                        case SelectorCombinatorEnum.child:
                            matched = matched.concat(this.findAll({
                                scope,
                                rootElement,
                                children: childrenOfChild,
                                selectorItems: selectorItems.slice(1),
                                cachedItem
                            }, position));
                            break;
                        case SelectorCombinatorEnum.subsequentSibling:
                            const index = children.indexOf(child);
                            for (let j = index + 1; j < children.length; j++) {
                                const sibling = children[j];
                                matched = matched.concat(this.findAll({
                                    scope,
                                    rootElement,
                                    children: [sibling],
                                    selectorItems: selectorItems.slice(1),
                                    cachedItem
                                }, position));
                            }
                            break;
                    }
                }
            }
            if ((selectorItem.combinator === SelectorCombinatorEnum.none ||
                selectorItem.combinator === SelectorCombinatorEnum.descendant) &&
                childrenOfChild.length) {
                matched = matched.concat(this.findAll({
                    scope,
                    rootElement,
                    children: childrenOfChild,
                    selectorItems: selectorItems,
                    cachedItem
                }, position));
            }
        }
        return matched;
    }
    /**
     * Finds an element based on a query selector for a part of a list of selectors separated with comma.
     *
     * @param options Options.
     * @param options.scope Scope.
     * @param options.rootElement Root element.
     * @param options.children Child elements.
     * @param options.selectorItems Selector items.
     * @param options.cachedItem Cached item.
     * @param [documentPosition] Document position of the element.
     * @returns Document position and element map.
     */
    static findFirst(options, documentPosition) {
        const { scope, rootElement, children, selectorItems, cachedItem } = options;
        const selectorItem = selectorItems[0];
        const nextSelectorItem = selectorItems[1];
        if (!selectorItem) {
            return null;
        }
        for (let i = 0, max = children.length; i < max; i++) {
            const child = children[i];
            const childrenOfChild = child[PropertySymbol.elementArray];
            const position = (documentPosition ? documentPosition + '>' : '') + String.fromCharCode(i);
            child[PropertySymbol.affectsCache].push(cachedItem);
            if (selectorItem.match(scope, child)) {
                if (!nextSelectorItem) {
                    if (rootElement !== child) {
                        return { documentPosition: position, element: child };
                    }
                }
                else {
                    switch (nextSelectorItem.combinator) {
                        case SelectorCombinatorEnum.adjacentSibling:
                            const nextElementSibling = child.nextElementSibling;
                            if (nextElementSibling) {
                                const match = this.findFirst({
                                    scope,
                                    rootElement,
                                    children: [nextElementSibling],
                                    selectorItems: selectorItems.slice(1),
                                    cachedItem
                                }, position);
                                if (match) {
                                    return match;
                                }
                            }
                            break;
                        case SelectorCombinatorEnum.none:
                        case SelectorCombinatorEnum.descendant:
                        case SelectorCombinatorEnum.child:
                            const match = this.findFirst({
                                scope,
                                rootElement,
                                children: childrenOfChild,
                                selectorItems: selectorItems.slice(1),
                                cachedItem
                            }, position);
                            if (match) {
                                return match;
                            }
                            break;
                        case SelectorCombinatorEnum.subsequentSibling:
                            const index = children.indexOf(child);
                            for (let i = index + 1; i < children.length; i++) {
                                const sibling = children[i];
                                const match = this.findFirst({
                                    scope,
                                    rootElement,
                                    children: [sibling],
                                    selectorItems: selectorItems.slice(1),
                                    cachedItem
                                }, position);
                                if (match) {
                                    return match;
                                }
                            }
                            break;
                    }
                }
            }
            if ((selectorItem.combinator === SelectorCombinatorEnum.none ||
                selectorItem.combinator === SelectorCombinatorEnum.descendant) &&
                childrenOfChild.length) {
                const match = this.findFirst({
                    scope,
                    rootElement,
                    children: childrenOfChild,
                    selectorItems,
                    cachedItem
                }, position);
                if (match) {
                    return match;
                }
            }
        }
        return null;
    }
}
//# sourceMappingURL=QuerySelector.js.map