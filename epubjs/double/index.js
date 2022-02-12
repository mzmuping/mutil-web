import { extend, defer } from "../../utils/core";
import DefaultViewManager from "../default";
import { EVENTS } from "../../utils/constants";

/**
 * double of manager
 * @author Weilan Zhang
 */

class DoubleViewManager extends DefaultViewManager {
    constructor(options) {
        super(options);

        this.name = "double";

        this.settings = extend(this.settings || {}, {
            manager: 'double',
            infinite: true,
            overflow: undefined,
            axis: undefined,
            writingMode: undefined,
            flow: "scrolled",
            offset: 500,
            offsetDelta: 250,
            width: undefined,
            height: undefined,
            snap: false,
            afterScrolledTimeout: 10,
            allowScriptedContent: false
        });

        extend(this.settings, options.settings || {});

        // Gap can be 0, but defaults doesn't handle that
        if (options.settings.gap != "undefined" && options.settings.gap === 0) {
            this.settings.gap = options.settings.gap;
        }

        this.viewSettings = {
            ignoreClass: this.settings.ignoreClass,
            axis: this.settings.axis,
            flow: this.settings.flow,
            manager: this.settings.manager,
            layout: this.layout,
            width: 0,
            height: 0,
            forceEvenPages: false,
            allowScriptedContent: this.settings.allowScriptedContent
        };
    }

    display(section, target) {
        return DefaultViewManager.prototype.display.call(this, section, target)
            .then(function () {
                return this.fill();
            }.bind(this));
    }

    fill(_full) {
        var full = new defer();

        this.q.enqueue(() => {
            return this.check();
        }).then((result) => {
            if (result) {
                this.fill(full);
            } else {
                full.resolve();
            }
        });
        return full.promise;
    }

    moveTo(offset) {
        var distX = 0,
            distY = 0;

        var offsetX = 0,
            offsetY = 0;

        if (!this.isPaginated) {
            distY = offset.top;
            // eslint-disable-next-line no-unused-vars
            offsetY = offset.top + this.settings.offsetDelta;
        } else {
            distX = Math.floor(offset.left / this.layout.delta) * this.layout.delta;
            // eslint-disable-next-line no-unused-vars
            offsetX = distX + this.settings.offsetDelta;
        }

        if (distX > 0 || distY > 0) {
            this.scrollBy(distX, distY, true);
        }
    }

    afterResized(view) {
        this.emit(EVENTS.MANAGERS.RESIZE, view.section);
    }

    removeShownListeners(view) {
        view.onDisplayed = function () { };
    }

    add(section) {
        var view = this.createView(section);

        this.views.append(view);

        view.on(EVENTS.VIEWS.RESIZED, (bounds) => {
            view.expanded = true;
        });

        view.on(EVENTS.VIEWS.AXIS, (axis) => {
            this.updateAxis(axis);
        });

        view.on(EVENTS.VIEWS.WRITING_MODE, (mode) => {
            this.updateWritingMode(mode);
        });

        view.onDisplayed = this.afterDisplayed.bind(this);
        view.onResize = this.afterResized.bind(this);

        return view.display(this.request);
    }

    append(section) {
        var view = this.createView(section);

        view.on(EVENTS.VIEWS.RESIZED, (bounds) => {
            view.expanded = true;
        });

        view.on(EVENTS.VIEWS.AXIS, (axis) => {
            this.updateAxis(axis);
        });

        view.on(EVENTS.VIEWS.WRITING_MODE, (mode) => {
            this.updateWritingMode(mode);
        });

        this.views.append(view);

        view.onDisplayed = this.afterDisplayed.bind(this);
        view.onResize = this.afterResized.bind(this);

        return view.display(this.request);
    }

    prepend(section) {
        var view = this.createView(section);

        view.on(EVENTS.VIEWS.RESIZED, (bounds) => {
            view.expanded = true;
        });

        view.on(EVENTS.VIEWS.AXIS, (axis) => {
            this.updateAxis(axis);
        });

        view.on(EVENTS.VIEWS.WRITING_MODE, (mode) => {
            this.updateWritingMode(mode);
        });

        this.views.prepend(view);

        view.onDisplayed = this.afterDisplayed.bind(this);
        view.onResize = this.afterResized.bind(this);

        return view.display(this.request);
    }

    update(_offset) {
        var container = this.bounds();
        var views = this.views.all();
        var viewsLength = views.length;
        var visible = [];
        var offset = typeof _offset != "undefined" ? _offset : (this.settings.offset || 0);
        var isVisible;
        var view;

        var updating = new defer();
        var promises = [];
        for (var i = 0; i < viewsLength; i++) {
            view = views[i];

            isVisible = this.isVisible(view, offset, offset, container);

            if (isVisible === true) {

                if (!view.displayed) {
                    let displayed = view.display(this.request)
                        .then(function (view) {
                            view.show();
                        }, (err) => {
                            view.hide();
                        });
                    promises.push(displayed);
                } else {
                    view.show();
                }
                visible.push(view);
            } else {
                this.q.enqueue(view.destroy.bind(view));
                // console.log("hidden " + view.index, view.displayed);

                clearTimeout(this.trimTimeout);
                this.trimTimeout = setTimeout(function () {
                    this.q.enqueue(this.trim.bind(this));
                }.bind(this), 250);
            }

        }

        if (promises.length) {
            return Promise.all(promises)
                .catch((err) => {
                    updating.reject(err);
                });
        } else {
            updating.resolve();
            return updating.promise;
        }

    }

    check() {
        var checking = new defer();
        var newViews = [];

        let prepend = () => {
            let first = this.views.first();
            let prev = first && first.section.prev();

            if (prev) {
                newViews.push(this.prepend(prev));
            }
        };

        let append = () => {
            let last = this.views.last();
            let next = last && last.section.next();

            if (next) {
                newViews.push(this.append(next));
            }
        };

        let activeIndex = (this.views.first() && this.views.first().section.index) || 0

        if (this.views.length < 2 && activeIndex % 2 === 0) {
            append();
        }

        if (this.views.length < 2 && activeIndex % 2 !== 0) {
            prepend();
        }

        if (newViews.length) {
            return Promise.all(newViews)
                .then(() => {
                    return this.check();
                })
                .then(() => {
                    // Check to see if anything new is on screen after rendering
                    return this.update();
                }, (err) => {
                    return err;
                });
        } else {
            this.q.enqueue(function () {
                this.update();
            }.bind(this));
            checking.resolve(false);
            return checking.promise;
        }


    }

    trim() {
        var task = new defer();
        var displayed = this.views.displayed();
        var first = displayed[0];
        var last = displayed[displayed.length - 1];
        var firstIndex = this.views.indexOf(first);
        var lastIndex = this.views.indexOf(last);
        var above = this.views.slice(0, firstIndex);
        var below = this.views.slice(lastIndex + 1);

        // Erase all but last above
        for (var i = 0; i < above.length - 1; i++) {
            this.views.remove(above[i]);
        }

        // Erase all except first below
        for (var j = 1; j < below.length; j++) {
            this.views.remove(below[j]);
        }

        task.resolve();
        return task.promise;
    }

    removeViews() {
        var above = this.views.displayed();

        // Erase all but last above
        for (var i = 0; i < above.length; i++) {
            this.views.remove(above[i]);
        }
    }

    next() {
        if (!this.views.length || !this.views.last().section.next()) return;

        let next = this.views.last().section.next();

        this.removeViews()

        return this.append(next).then(function () {
            return this.check();
        }.bind(this));
    }

    prev() {

        if (!this.views.length || !this.views.first().section.prev()) return;

        let prev = this.views.first().section.prev();

        this.removeViews()

        return this.append(prev).then(function () {
            return this.check();
        }.bind(this));
    }

    destroy() {
        super.destroy();
    }

}

export default DoubleViewManager;
