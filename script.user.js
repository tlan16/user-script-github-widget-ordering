// ==UserScript==
// @name         GitHub - Reorder Widges
// @namespace    http://tampermonkey.net/
// @description  Display property id and listing id
// @author       Frank Lan
// @version      1.1
// @license      GPL-3.0 license
// @match        https://github.com/*
// @match        https://git.realestate.com.au/*
// @match        https://www.property.com.au/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=github.com
// @updateURL    https://github.com/tlan16/user-script-github-widget-ordering/raw/main/script.user.js
// @downloadURL  https://github.com/tlan16/user-script-github-widget-ordering/raw/main/script.user.js
// @homepage     https://github.com/tlan16/user-script-github-widget-ordering
// @supportURL   https://github.com/tlan16/user-script-github-widget-ordering
// @grant        none
// @run-at       document-start
// ==/UserScript==

(async function() {
    'use strict';
    // Monkey patch console to prefix logs with [GitHub Widget Reorder] for easier debugging
    // Most be at the top
    const _console = window.console;
    const log = (method, ...args) => _console[method]('[GitHub Widget Reorder]', ...args);
    const console = {
        log:   (...a) => log('log',   ...a),
        info:  (...a) => log('info',  ...a),
        warn:  (...a) => log('warn',  ...a),
        error: (...a) => log('error', ...a),
    };

    const main = () => waitFor(condition, action);
    main();
    document.addEventListener('turbo:load', () => {
        // dataset.moved is on the old DOM node which is gone after navigation anyway
        // so no reset needed — the new page's element won't have the flag
        main();
    });

    /**
     * Polls until a condition is met, then runs a callback.
     * @param {function(): boolean} condition - Returns truthy when ready (can return the found value)
     * @param {Function} callback  - Called with the return value of condition()
     * @param {Object}   opts
     * @param {number}   opts.timeout   - Max wait in ms (default: 30_000)
     * @param {number}   opts.interval  - Poll interval in ms (default: 300)
     * @param {Function} opts.onTimeout - Called if timeout is reached (optional)
     */
    function waitFor(condition, callback, {
        timeout  = 30_000,
        interval = 300,
        onTimeout = null,
    } = {}) {
        const start = Date.now();

        const poll = () => {
            const result = condition();

            if (result) {
                callback(result);
                return;
            }

            if (Date.now() - start >= timeout) {
                onTimeout?.();
                return;
            }

            setTimeout(poll, interval);
        };

        poll(); // start immediately, no initial delay
    }

    /**
     * @returns {boolean}
     */
    function condition() {
        return find_language_element_side_nav_row() !== null && find_side_nav() !== null;
    }

    /**
     * @returns {void}
     */
    function action() {
        const side_nav = find_side_nav();
        const language_element = find_language_element_side_nav_row();
        if (!side_nav || !language_element) {
            throw new Error(`Expected to find both side_nav and language_element, but got: ${side_nav}, ${language_element}`);
        }
        move_language_widget_to_top(side_nav, language_element);
    }

    /**
     * @param {HTMLElement} side_nav
     * @param {HTMLElement} language_element
     * @return {void}
     */
    function move_language_widget_to_top(side_nav, language_element) {
        if (language_element.dataset.moved === 'true') return;

        const first_child = side_nav.firstElementChild;
        if (first_child === language_element) {
            console.info('Language widget is already at the top');
            language_element.dataset.moved = 'true';
            return;
        }
        side_nav.insertBefore(language_element, first_child);
        language_element.dataset.moved = 'true';
        console.info('Moved language widget to the top');
    }

    /**
     * @returns {HTMLElement | null}
     */
    function find_language_element_side_nav_row() {
        const xpath = `//body//*[@data-partial-name="codeViewRepoRoute.Sidebar"]/*[contains(@class, "BorderGrid")]//h2[text()="Languages"]`
        const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
        const element = result.singleNodeValue;
        if (element instanceof HTMLElement) {
            console.info('Found language element in side nav row');
            return element.closest('.BorderGrid-row');
        }
        console.info('Could not find language element, cannot find side nav');
        return null;
    }

    /**
     * @returns {HTMLElement | null}
     */
    function find_side_nav() {
        const language_element = find_language_element_side_nav_row();
        if (!language_element) return null;
        console.info('Finding side nav by looking for closest .BorderGrid to language element');
        return language_element.closest('.BorderGrid');
    }
})();