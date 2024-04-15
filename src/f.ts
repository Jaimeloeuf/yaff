import { Component } from "./Component";
import type { VNode, VNodes, HTMLTags } from "./types/index";

export class f {
  /**
   * Create any generic `VNode` with a custom tag.
   */
  static create = (tag: HTMLTags) => new f(tag);

  static get a() {
    return new f("a");
  }
  static get abbr() {
    return new f("abbr");
  }
  static get address() {
    return new f("address");
  }
  static get area() {
    return new f("area");
  }
  static get article() {
    return new f("article");
  }
  static get aside() {
    return new f("aside");
  }
  static get audio() {
    return new f("audio");
  }
  static get b() {
    return new f("b");
  }
  static get base() {
    return new f("base");
  }
  static get bdi() {
    return new f("bdi");
  }
  static get bdo() {
    return new f("bdo");
  }
  static get blockquote() {
    return new f("blockquote");
  }
  static get body() {
    return new f("body");
  }
  static get br() {
    return new f("br");
  }
  static get button() {
    return new f("button");
  }
  static get canvas() {
    return new f("canvas");
  }
  static get caption() {
    return new f("caption");
  }
  static get cite() {
    return new f("cite");
  }
  static get code() {
    return new f("code");
  }
  static get col() {
    return new f("col");
  }
  static get colgroup() {
    return new f("colgroup");
  }
  static get data() {
    return new f("data");
  }
  static get datalist() {
    return new f("datalist");
  }
  static get dd() {
    return new f("dd");
  }
  static get del() {
    return new f("del");
  }
  static get details() {
    return new f("details");
  }
  static get dfn() {
    return new f("dfn");
  }
  static get dialog() {
    return new f("dialog");
  }
  static get div() {
    return new f("div");
  }
  static get dl() {
    return new f("dl");
  }
  static get dt() {
    return new f("dt");
  }
  static get em() {
    return new f("em");
  }
  static get embed() {
    return new f("embed");
  }
  static get fieldset() {
    return new f("fieldset");
  }
  static get figcaption() {
    return new f("figcaption");
  }
  static get figure() {
    return new f("figure");
  }
  static get footer() {
    return new f("footer");
  }
  static get form() {
    return new f("form");
  }
  static get h1() {
    return new f("h1");
  }
  static get h2() {
    return new f("h2");
  }
  static get h3() {
    return new f("h3");
  }
  static get h4() {
    return new f("h4");
  }
  static get h5() {
    return new f("h5");
  }
  static get h6() {
    return new f("h6");
  }
  static get head() {
    return new f("head");
  }
  static get header() {
    return new f("header");
  }
  static get hgroup() {
    return new f("hgroup");
  }
  static get hr() {
    return new f("hr");
  }
  static get html() {
    return new f("html");
  }
  static get i() {
    return new f("i");
  }
  static get iframe() {
    return new f("iframe");
  }
  static get img() {
    return new f("img");
  }
  static get input() {
    return new f("input");
  }
  static get ins() {
    return new f("ins");
  }
  static get kbd() {
    return new f("kbd");
  }
  static get label() {
    return new f("label");
  }
  static get legend() {
    return new f("legend");
  }
  static get li() {
    return new f("li");
  }
  static get link() {
    return new f("link");
  }
  static get main() {
    return new f("main");
  }
  static get map() {
    return new f("map");
  }
  static get mark() {
    return new f("mark");
  }
  static get math() {
    return new f("math");
  }
  static get menu() {
    return new f("menu");
  }
  static get menuitem() {
    return new f("menuitem");
  }
  static get meta() {
    return new f("meta");
  }
  static get meter() {
    return new f("meter");
  }
  static get nav() {
    return new f("nav");
  }
  static get noscript() {
    return new f("noscript");
  }
  static get object() {
    return new f("object");
  }
  static get ol() {
    return new f("ol");
  }
  static get optgroup() {
    return new f("optgroup");
  }
  static get option() {
    return new f("option");
  }
  static get output() {
    return new f("output");
  }
  static get p() {
    return new f("p");
  }
  static get param() {
    return new f("param");
  }
  static get picture() {
    return new f("picture");
  }
  static get pre() {
    return new f("pre");
  }
  static get progress() {
    return new f("progress");
  }
  static get q() {
    return new f("q");
  }
  static get rb() {
    return new f("rb");
  }
  static get rp() {
    return new f("rp");
  }
  static get rt() {
    return new f("rt");
  }
  static get rtc() {
    return new f("rtc");
  }
  static get ruby() {
    return new f("ruby");
  }
  static get s() {
    return new f("s");
  }
  static get samp() {
    return new f("samp");
  }
  static get script() {
    return new f("script");
  }
  static get section() {
    return new f("section");
  }
  static get select() {
    return new f("select");
  }
  static get slot() {
    return new f("slot");
  }
  static get small() {
    return new f("small");
  }
  static get source() {
    return new f("source");
  }
  static get span() {
    return new f("span");
  }
  static get strong() {
    return new f("strong");
  }
  static get style() {
    return new f("style");
  }
  static get sub() {
    return new f("sub");
  }
  static get summary() {
    return new f("summary");
  }
  static get sup() {
    return new f("sup");
  }
  static get svg() {
    return new f("svg");
  }
  static get table() {
    return new f("table");
  }
  static get tbody() {
    return new f("tbody");
  }
  static get td() {
    return new f("td");
  }
  static get template() {
    return new f("template");
  }
  static get textarea() {
    return new f("textarea");
  }
  static get tfoot() {
    return new f("tfoot");
  }
  static get th() {
    return new f("th");
  }
  static get thead() {
    return new f("thead");
  }
  static get time() {
    return new f("time");
  }
  static get title() {
    return new f("title");
  }
  static get tr() {
    return new f("tr");
  }
  static get track() {
    return new f("track");
  }
  static get u() {
    return new f("u");
  }
  static get ul() {
    return new f("ul");
  }
  static get var() {
    return new f("var");
  }
  static get video() {
    return new f("video");
  }
  static get wbr() {
    return new f("wbr");
  }

  constructor(private readonly tag: HTMLTags) {}

  private _attrs: VNode["attrs"] = {};
  private _event: VNode["event"] = {};
  private _child?: VNode["child"];

  /**
   * This will merge the given attributes to whatever attributes already set so
   * as to prevent overriding them. E.g. when using this after setting `class`.
   *
   * Returns `this` to make this method chainable.
   */
  attrs(attributes: VNode["attrs"]) {
    this._attrs = { ...this._attrs, ...attributes };
    return this;
  }

  /**
   * Sets the class string attribute, merges given classes with any existing
   * classes previously set through the same method.
   *
   * Multiple chained calls to class method makes it easier to do conditionals
   * where a && short circuiting expression can be used.
   *
   * Returns `this` to make this method chainable.
   */
  class(classNames: string | false) {
    // Do nothing on short circuited class expressions
    if (classNames === false) {
      return this;
    }

    this._attrs.class =
      this._attrs.class === undefined
        ? classNames
        : this._attrs.class + " " + classNames;

    // Alternative that will always start with a leading space
    // this._attrs.class = this._attrs.class ?? "" + " " + classNames;

    return this;
  }

  /**
   * Returns `this` to make this method chainable.
   */
  event(eventName: string, eventHandler: (event: Event) => void) {
    if (this._event === undefined) {
      this._event = {};
    }

    this._event[eventName] = eventHandler;
    return this;
  }

  /**
   * Call this method to set the child VNode/value of the current node.
   *
   * Call this method last as this will create the `VNode` right after.
   */
  child(child: Component | VNode | VNodes | string | false = []) {
    // No-op to ignore conditionally hidden VNode child values using logical OR
    // and AND operator short circuiting instead of forcing them to use ternary
    // operators to conditional include VNodes..
    if (child === false) {
    }

    // Flattern child VNode so the final child property of the VNode is a flat
    // array of VNodes, nested VNode arrays are supported here to make template
    // creation easier instead of requiring user to spread their VNode arrays.
    // https://github.com/microsoft/TypeScript/issues/49280
    else if (Array.isArray(child)) {
      // Transform steps:
      // 1. Flatten all the way down
      // 2. Remove short circuited children
      // 3. Wrap plain text child in 'p' tags to support text nodes
      this._child = child
        .flat(Infinity as 1)
        .filter((value) => value !== false)
        .map((value) =>
          typeof value === "string" ? f.p.child(value) : value
        ) as Array<VNode>;
    }

    // String values are left as is
    else if (typeof child === "string") {
      this._child = child;
    }

    // If a custom component is passed in, render that component to get back the
    // VNode it created.
    else if (child instanceof Component) {
      // Since `VNode.child` is Array<VNode> or string, nest it in an array.
      this._child = [child.render()];
    }

    // Since `VNode.child` is Array<VNode> or string, nest it in an array.
    else {
      this._child = [child];
    }

    return this.create();
  }

  /**
   * Call this method last to create the `VNode`.
   *
   * Call this directly if the element has no child, e.g. self closing tags.
   */
  create(): VNode {
    return {
      tag: this.tag,
      attrs: this._attrs,
      // non-null assertion operator (!) is used to circumvent the TS setting
      // `exactOptionalPropertyTypes` in this local context only.
      event: this._event!,
      child: this._child ?? [],
    };
  }
}
