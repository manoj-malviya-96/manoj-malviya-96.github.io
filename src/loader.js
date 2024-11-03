class DynamicContentCreator {
  constructor() {}

  async generate(
    containerId,
    elementCreator,
    elementInputList,
    runParallel = false,
  ) {
    const container = document.getElementById(containerId);
    if (!container) {
      console.error(`Container with id ${containerId} not found.`);
      return;
    }

    const fragment = document.createDocumentFragment();
    if (runParallel) {
      // Parallel processing with Promise.all
      const elements = await Promise.all(
        elementInputList.map((input) => elementCreator(input)),
      );
      elements.forEach((element) => fragment.appendChild(element));
    } else {
      // Sequential processing with for...of and await
      for (const input of elementInputList) {
        const element = await elementCreator(input);
        fragment.appendChild(element);
      }
    }
    container.appendChild(fragment); // Append all elements at once
  }
}
