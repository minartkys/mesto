export class Section {
  constructor(items, renderer, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = containerSelector;
  }

  renderer() {
    const result = this._renderedItems.map((item) =>
      this._container.append(this._renderer(item))
    );
    return result;
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
