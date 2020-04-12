/*!
 * Lazy Load - JavaScript plugin for lazy loading images
 *
 * Copyright (c) 2007-2019 Mika Tuupola
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *   https://appelsiini.net/projects/lazyload
 *
 * Version: 2.0.0-rc.2
 *
 */

const root = window;

const defaults = {
    src: 'data-src',
    srcset: 'data-srcset',
    selector: '.lazyload',
    root: null,
    rootMargin: '0px',
    threshold: 0,
};

/**
 * Merge two or more objects. Returns a new object.
 * @private
 * @param {Boolean}  deep     If true, do a deep (or recursive) merge [optional]
 * @param {Object}   objects  The objects to merge together
 * @returns {Object}          Merged values of defaults and options
 */
const extend = function () {
    const extended = {};
    let deep = false;
    let i = 0;
    const length = arguments.length;

    /* Check if a deep merge */
    if (Object.prototype.toString.call(arguments[0]) === '[object Boolean]') {
        deep = arguments[0];
        i++;
    }

    /* Merge the object into the extended object */
    const merge = function (obj) {
        for (const prop in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, prop)) {
                /* If deep merge and property is an object, merge properties */
                if (
                    deep &&
                    Object.prototype.toString.call(obj[prop]) ===
                        '[object Object]'
                ) {
                    extended[prop] = extend(true, extended[prop], obj[prop]);
                } else {
                    extended[prop] = obj[prop];
                }
            }
        }
    };

    /* Loop through each object and conduct a merge */
    for (; i < length; i++) {
        const obj = arguments[i];
        merge(obj);
    }

    return extended;
};

function LazyLoad(images, options) {
    this.settings = extend(defaults, options || {});
    this.images = images || document.querySelectorAll(this.settings.selector);
    this.observer = null;
    this.init();
}

LazyLoad.prototype = {
    init: function () {
        /* Without observers load everything and bail out early. */
        if (!root.IntersectionObserver) {
            this.loadImages();
            return;
        }

        const self = this;
        const observerConfig = {
            root: this.settings.root,
            rootMargin: this.settings.rootMargin,
            threshold: [this.settings.threshold],
        };

        this.observer = new IntersectionObserver(function (entries) {
            Array.prototype.forEach.call(entries, function (entry) {
                if (
                    entry.isIntersecting ||
                    entry.isIntersecting === undefined
                ) {
                    self.observer.unobserve(entry.target);
                    const src = entry.target.getAttribute(self.settings.src);
                    const srcset = entry.target.getAttribute(
                        self.settings.srcset
                    );
                    if (entry.target.tagName.toLowerCase() === 'img') {
                        if (src) {
                            entry.target.src = src;
                        }
                        if (srcset) {
                            entry.target.srcset = srcset;
                        }
                    } else {
                        entry.target.style.backgroundImage = 'url(' + src + ')';
                    }
                }
            });
        }, observerConfig);

        Array.prototype.forEach.call(this.images, function (image) {
            self.observer.observe(image);
        });
    },

    loadAndDestroy: function () {
        if (!this.settings) {
            return;
        }
        this.loadImages();
        this.destroy();
    },

    loadImages: function () {
        if (!this.settings) {
            return;
        }

        const self = this;
        Array.prototype.forEach.call(this.images, function (image) {
            const src = image.getAttribute(self.settings.src);
            const srcset = image.getAttribute(self.settings.srcset);
            if (image.tagName.toLowerCase() === 'img') {
                if (src) {
                    image.src = src;
                }
                if (srcset) {
                    image.srcset = srcset;
                }
            } else {
                image.style.backgroundImage = "url('" + src + "')";
            }
        });
    },

    destroy: function () {
        if (!this.settings) {
            return;
        }
        this.observer.disconnect();
        this.settings = null;
    },
};

root.lazyload = function (images, options) {
    return new LazyLoad(images, options);
};

if (root.jQuery) {
    const $ = root.jQuery;
    $.fn.lazyload = function (options) {
        options = options || {};
        options.attribute = options.attribute || 'data-src';
        // eslint-disable-next-line no-new
        new LazyLoad($.makeArray(this), options);
        return this;
    };
}

export default LazyLoad;
