// from https://stackoverflow.com/questions/63141123/get-text-content-from-react-element-stored-in-a-variable
export function textContent(elem: React.ReactElement | string): string {
    if (!elem) {
        return "";
    }
    if (typeof elem === "string") {
        return elem;
    }
    // Debugging for basic content shows that props.children, if any, is either a
    // ReactElement, or a string, or an Array with any combination. Like for
    // `<p>Hello <em>world</em>!</p>`:
    //
    //   $$typeof: Symbol(react.element)
    //   type: "p"
    //   props:
    //     children:
    //       - "Hello "
    //       - $$typeof: Symbol(react.element)
    //         type: "em"
    //         props:
    //           children: "world"
    //       - "!"
    const children = elem.props && elem.props.children;
    if (children instanceof Array) {
        return children.map(textContent).join("");
    }
    return textContent(children);
}
