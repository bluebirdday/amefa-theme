const initPlpSwatches = () => {
  this.shop = window.Shopify.shop;
  this.apiURL = 'https://seo-variants-40d4a5e51792.herokuapp.com/api/v1';
  const swatchMetaData = window.metafieldData;
  const products = document.querySelectorAll('[data-product-id]');
  getCss(this.apiUrl);

  products.forEach(product => {
    const productId = product.dataset.productId;
    const productGroup = swatchMetaData.find(pg => pg.variants.some(v => v.shopify_id === `gid://shopify/Product/${productId}`));

    if (productGroup) {
      const activeVariant = productGroup.variants.find(variant => variant.shopify_id === `gid://shopify/Product/${productId}`);
      const inactiveCombinations = productGroup.variants.filter(variant => variant.disabled);
      renderOptions(product, productGroup, activeVariant, inactiveCombinations);
    } else {
      console.log('Product group for the current product not found.');
    }
  });
};

async function getCss(apiUrl) {
  const cssUrl = `${this.apiURL}/settings?shopify_domain=${encodeURIComponent(this.shop)}`;

  try {
    const response = await fetch(cssUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      const data = await response.json();
      const styleElement = document.createElement('style');

      if (data.custom_css) {
        styleElement.textContent = data.custom_css;
      } else {
        styleElement.textContent = `
          ul.seo-variants__list {
            list-style: none;
            padding: 0px;
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
          }

          .seo-variants__item button {
            cursor: pointer;
            border: none;
            background: none;
            text-decoration: none;
            color: black;
            padding: 8px 16px;
            border: 1px solid black;
            border-radius: 5px;
            font-size: 14px;
            transition: 0.15s;
          }

          .seo-variants__item button:hover {
            opacity: 0.9;
          }

          .seo-variants__item.active button {
            background: black;
            color: white;
          }

          .seo-variants__item.inactive button {
            color: #ccc;
            cursor: not-allowed;
            background-color: #f4f4f4;
            position: relative;
          }

          /* Tooltip container */
          .seo-variants__tooltip {
            position: relative;
            display: inline-block;
            color: #006080;
          }

          /* Tooltip text */
          .seo-variants__tooltip .seo-variants__tooltiptext {
            visibility: hidden;
            position: absolute;
            width: 80px;
            background-color: #555;
            color: #fff;
            text-align: center;
            padding: 5px 0;
            border-radius: 6px;
            z-index: 1;
            opacity: 0;
            transition: opacity .6s;
            font-size: 12px;
          }
          .seo-variants__tooltip-top {
            bottom: 120%;
            left: 50%;
            margin-left: -40px;
          }
          .seo-variants__tooltip-top::after {
            content: "";
            position: absolute;
            top: 100%;
            left: 50%;
            margin-left: -5px;
            border-width: 5px;
            border-style: solid;
            border-color: #555 transparent transparent transparent;
          }

          /* Show the tooltip text when you mouse over the tooltip container */
          .seo-variants__tooltip:hover .seo-variants__tooltiptext {
            visibility: visible;
            opacity: 1;
          }

          /* Image style */
          .seo-variants__list.is-style-image,
          .seo-variants__list.is-style-color {
            gap: 24px;
          }

          .seo-variants__list.is-style-image button {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            gap: 12px;
            border-radius: 50%;
            padding: 0px;
            box-shadow: 0 0 0 3px #DFDFDF;
            border-width: 0px;
            width: 50px;
            height: 50px;
            outline: 0px;
            overflow: hidden;
            background-color: transparent;
          }

          .seo-variants__list.is-style-image button img {
            border-radius: 50%;
            border: 1px solid #e0dfdf;
            width: 100%;
            height: 50px;
            object-fit: cover;
          }

          .seo-variants__list.is-style-image .seo-variants__item.active button,
          .seo-variants__list.is-style-color .seo-variants__item.active button {
            box-shadow: 0 0 0 3px #202223;
            border-radius: 50%;
          }

          .seo-variants__list.is-style-image .seo-variants__item.inactive button,
          .seo-variants__list.is-style-color .seo-variants__item.inactive button {
            color: #ccc;
            cursor: not-allowed;
            background-color: #202223;
            position: relative;
          }
          .seo-variants__list.is-style-color .seo-variants__item.inactive button::before {
            content: '';
            position: absolute;
            left: 6px;
            top: 0px;
            width: 70%;
            height: 100%;
            background: linear-gradient(to top right, transparent 0%, transparent calc(50% - 5px), #DFDFDF calc(50% - 1px), #DFDFDF 50%, transparent 50%, transparent 100%);
            z-index: 1;
          }
          .seo-variants__list.is-style-image .seo-variants__item.inactive button::before {
            content: '';
            position: absolute;
            left: 8px;
            top: 0px;
            width: 65%;
            height: 100%;
            background: linear-gradient(to top right, transparent 0%, transparent calc(50% - 5px), #DFDFDF calc(50% - 1px), #DFDFDF 50%, transparent 50%, transparent 100%);
          }

          .seo-variants__item.inactive button::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(to top right, transparent 0%, transparent calc(50% - 2px), #DFDFDF calc(50% - 1px), #DFDFDF 50%, transparent 50%, transparent 100%);
            z-index: 1;
          }

          .seo-variants__list.is-style-image .seo-variants__item.inactive button img {
            opacity: 50%;
          }

          .seo-variants__label {
            display: block;
            width: 100%;
            margin-top: 18px;
            margin-bottom: 18px;
            font-size: 14px;
            font-weight: bold;
          }

          .optionvalue {
            font-weight: normal;
          }

          /* Color style */
          .seo-variants__list.is-style-color .seo-variants__color {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            border: 1px solid white;
            display: block;
            flex-grow: 0;
            box-sizing: border-box;
          }

          .seo-variants__list.is-style-color button {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            gap: 12px;
            border-radius: 50%;
            padding: 0px;
            box-shadow: 0 0 0 3px #DFDFDF;
            border-width: 0px;
            width: 30px;
            height: 30px;
            outline: 0px;
            overflow: hidden;
            background-color: transparent;
          }

          /* Dropdown */
          .seo-variants__list.is-style-dropdown {
            flex-direction: column;
            gap: 12px;
            max-width: 400px;
          }

          .seo-variants__list.is-style-dropdown .seo-variants__item {
            display: flex;
            gap: 20px;
            align-items: center;
            justify-content: space-between;
          }

          .seo-variants__list.is-style-dropdown select {
            padding: 8px 4px;
            border-radius: 4px;
            border-color: rgba(00, 00, 00, 0.5);
            min-width: 230px;
            font-size: 14px;
          }`;
      }
      document.head.appendChild(styleElement);
    }
  } catch (error) {
    console.log('Error fetching custom CSS:', error);
  }
}


function logCombinations(activeVariant, inactiveCombinations) {
  if (!inactiveCombinations || inactiveCombinations.length === 0) return [];

  // Get the active value IDs
  const activeValueIds = activeVariant.option_value_ids;

  // Initialize the array to log the disabled variants
  const matchingDisabledVariants = [];

  // Iterate over each inactive combination
  inactiveCombinations.forEach(inactiveCombination => {
    const inactiveValueIds = inactiveCombination.option_value_ids;

    // Check if the inactive combination contains all the same value IDs except for one
    const differingValues = inactiveValueIds.filter(id => !activeValueIds.includes(id));

    if (differingValues.length === 1 && inactiveValueIds.length === activeValueIds.length) {
      matchingDisabledVariants.push(inactiveCombination);
    }
  });

  // Create a new array that filters out the active value IDs from the matching disabled variant option value IDs
  return matchingDisabledVariants.map(variant => {
    return variant.option_value_ids.filter(id => !activeValueIds.includes(id));
  }).flat();
}

// Function to create the option picker elements
function createOptionPicker(option, activeVariant, inactiveCombinations) {
  const filteredDisabledValues = logCombinations(); // Call logCombinations to get filtered disabled value IDs
  let variantHTML = [];

  // Get the active value name for this option
  const activeValueName = option.option_values.find(value => activeVariant.option_value_ids.includes(value.id))?.name || '';

  // variantHTML.push(`<p class="seo-variants__label">${option?.name}${activeValueName ? `: <span class="optionvalue">${activeValueName}</span>` : ''}</p>`);

  if (option.option_type === 'dropdown') {
    // variantHTML.push('<ul class="seo-variants__list is-style-dropdown">');
    // variantHTML.push('<li class="seo-variants__item">');
    // variantHTML.push(`<select class="seo-variants__dropdown" data-option-id="${option.id}">`);
    // option.option_values.forEach((value) => {
    //   let isActive = activeVariant && activeVariant.option_value_ids.includes(value.id);
    //   let isDisabled = filteredDisabledValues && filteredDisabledValues.includes(value.id);
    //   variantHTML.push(`<option value="${value.id}" ${isActive ? 'selected' : ''} ${isDisabled ? 'disabled' : ''}>${value.name}</option>`);
    // });
    // variantHTML.push('</select></li></ul>');
  } else if (option.option_type === 'image') {
    // variantHTML.push('<ul class="seo-variants__list is-style-image">');
    // option.option_values.forEach((value) => {
    //   let isActive = activeVariant && activeVariant.option_value_ids.includes(value.id);
    //   let isDisabled = filteredDisabledValues && filteredDisabledValues.includes(value.id);
    //   variantHTML.push(`<div class="seo-variants__item ${isActive ? 'active' : ''} ${isDisabled ? 'inactive' : ''}">`);
    //   variantHTML.push('<div class="seo-variants__tooltip">');
    //   variantHTML.push(`<button id="${value.id}" data-option-id="${option.id}" ${isDisabled || isActive ? 'disabled' : ''} ${isActive ? 'class="active"' : ''}>`);
    //   variantHTML.push(`<img src="${value.image}" alt="${value.name}" />`);
    //   variantHTML.push(`<span class="seo-variants__tooltiptext seo-variants__tooltip-top">${value.name}</span></div></button></div>`);
    // });
    // variantHTML.push('</ul>');
  } else if (option.option_type === 'color') {
    variantHTML.push('<ul class="seo-variants__list is-style-color">');
    option.option_values.forEach((value) => {
      let isActive = activeVariant && activeVariant.option_value_ids.includes(value.id);
      let isDisabled = filteredDisabledValues && filteredDisabledValues.includes(value.id);
      variantHTML.push(`<div class="seo-variants__item ${isActive ? 'active' : ''} ${isDisabled ? 'inactive' : ''}">`);
      variantHTML.push('<div class="seo-variants__tooltip">');
      variantHTML.push(`<button id="${value.id}" data-option-id="${option.id}" ${isDisabled || isActive ? 'disabled' : ''} ${isActive ? 'class="active"' : ''}>`);
      variantHTML.push(`<span style="background-color: ${value.color};" class="seo-variants__color"></span>`);
      variantHTML.push(`<span class="seo-variants__tooltiptext seo-variants__tooltip-top">${value.name}</span></div></button></div>`);
    });
    variantHTML.push('</ul>');
  } else {
    // variantHTML.push('<ul class="seo-variants__list">');
    // option.option_values.forEach((value) => {
    //   let isActive = activeVariant && activeVariant.option_value_ids.includes(value.id);
    //   let isDisabled = filteredDisabledValues && filteredDisabledValues.includes(value.id);
    //   variantHTML.push(`<li class="seo-variants__item ${isActive ? 'active' : ''} ${isDisabled ? 'inactive' : ''}">`);
    //   variantHTML.push(`<button id="${value.id}" data-option-id="${option.id}" ${isDisabled || isActive ? 'disabled' : ''} ${isActive ? 'class="active"' : ''}>${value.name}</button></li>`);
    // });
    // variantHTML.push('</ul>');
  }

  return variantHTML.join('');
}

// Function to render the options and values
function renderOptions(product, productGroup, activeVariant, inactiveCombinations) {
  const variantPickerContent = product.querySelector('.card__swatches');

  let allOptionsHTML = '';
  productGroup.options.forEach(option => {
    const optionPicker = createOptionPicker(option, activeVariant, inactiveCombinations);
    allOptionsHTML += optionPicker;
  });

  variantPickerContent.innerHTML = allOptionsHTML;

  // Show the variant picker content
  variantPickerContent.style.display = 'block';

  // Add click event listeners to the buttons
  const buttons = variantPickerContent.querySelectorAll('button');
  buttons.forEach(button => {
    button.addEventListener('click', (event) => {
      handlePickerClick(button, event, productGroup, activeVariant, inactiveCombinations);
    });
  });

  // Add change event listeners to the dropdowns
  const dropdowns = variantPickerContent.querySelectorAll('select');
  dropdowns.forEach(dropdown => {
    dropdown.addEventListener('change', () => {
      handleDropdownChange(dropdown, productGroup, activeVariant, inactiveCombinations);
    });
  });
}

// Function to handle the picker click
function handlePickerClick(button, event, productGroup, activeVariant, inactiveCombinations) {
  // Prevent form submission
  event.preventDefault();
  const clickedValueId = parseInt(button.id);
  const optionId = parseInt(button.dataset.optionId);
  const product = event.target.closest('[data-product-id]');

  const selectedValues = getSelectedValues(product,optionId, clickedValueId, activeVariant, inactiveCombinations);

  const selectedVariant = findMatchingVariant(selectedValues, productGroup);

  if (selectedVariant) {
    window.location.href = `${window.location.origin}/products/${selectedVariant.shopify_product_url}`;
  } else {
    console.log('No matching variant found.');
  }
}

// Function to handle dropdown change
function handleDropdownChange(dropdown, productGroup, activeVariant, inactiveCombinations) {
  const selectedValueId = parseInt(dropdown.value);
  const optionId = parseInt(dropdown.dataset.optionId);
  const product = dropdown.closest('[data-product-id]')
  const selectedValues = getSelectedValues(product, optionId, selectedValueId, activeVariant, inactiveCombinations);

  const selectedVariant = findMatchingVariant(selectedValues, productGroup);

  if (selectedVariant) {
    window.location.href = `${window.location.origin}/products/${selectedVariant.shopify_product_url}`;
  } else {
    console.log('No matching variant found.');
  }
}

// Function to get the selected values
function getSelectedValues(product, optionId, selectedValueId, activeVariant, inactiveCombinations) {
  const selectedValues = [];
  const variantPickerContent = product.querySelector('.card__swatches');

  // Add the selected value ID
  selectedValues.push(selectedValueId);

  // Add other active values from the same product group
  const activeButtons = variantPickerContent.querySelectorAll('.seo-variants__item.active button');
  activeButtons.forEach(button => {
    const valueId = parseInt(button.id);
    const currentOptionId = parseInt(button.dataset.optionId);

    if (currentOptionId !== optionId) {
      selectedValues.push(valueId);
    }
  });

  const activeDropdowns = variantPickerContent.querySelectorAll('.seo-variants__dropdown');
  activeDropdowns.forEach(dropdown => {
    const valueId = parseInt(dropdown.value);
    const currentOptionId = parseInt(dropdown.dataset.optionId);

    if (currentOptionId !== optionId) {
      selectedValues.push(valueId);
    }
  });

  return selectedValues;
}

// Function to find the matching variant
function findMatchingVariant(selectedValues, productGroup) {
  return productGroup.variants.find(variant => {
    return selectedValues.every(id => variant.option_value_ids.includes(id));
  });
}

window.addEventListener('DOMContentLoaded', () => {
  initPlpSwatches();
});
