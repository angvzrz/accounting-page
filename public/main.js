/** Create an element ready to fit in a card style
 * @param {string} icon Icon url string for displaying in the card
 * @param {string} text Text description of the card
 */
function cardContent(icon, text) {
  const fragment = document.createDocumentFragment();

  const iconElement = document.createElement('img');
  iconElement.src = icon;
  iconElement.className = 'introduction-card-icon';

  const textElement = document.createElement('p');
  textElement.textContent = text;
  textElement.className = 'padding-horizontal';

  fragment.append(iconElement);
  fragment.append(textElement);

  return fragment;
}

/** Create a card with product details
 * @param {string} icon Icon url string for displaying in the card
 * @param {string} text Text description of product
 */
function introductionCard(icon, text) {
  const container = document.createElement('article');
  container.classList.add('introduction-card');
  container.classList.add('slide');

  const content = cardContent(icon, text);
  container.append(content);

  return container;
}

/** Create a card style for showcasing steps to use the app
 * @param {string} icon Icon url string for displaying in the card
 * @param {string} text Text description of the step
 * @param {number} step Step number
 */
function initialStep(icon, text, step) {
  const container = document.createElement('article');
  container.className = 'step';

  const content = cardContent(icon, text);
  container.append(content);

  const stepHeadline = document.createElement('h2');
  stepHeadline.innerHTML = `PASO ${step}`;
  container.insertBefore(stepHeadline, container.children[1]);

  return container;
}

function handleModalCardClick(event) {
  if (window.innerWidth > 768) {
    event.currentTarget.removeEventListener('click', handleModalCardClick);
    return;
  }

  const focusedCard = document.querySelector(
    '.modal-content .modal-card:focus'
  );

  if (focusedCard) {
    focusedCard.blur();
  }

  event.currentTarget.focus();
}

/** Create a card for displaying inside a modal. It showcases a
 * plan for using the product
 * @param {string} title Plan title
 * @param {number} plan Billing plan cost
 * @param {string} description Plan description; Number of operations
 * @param {string} callToAction Call to action button text
 */
function modalCard(title, plan, description, callToAction) {
  const container = document.createElement('article');
  container.setAttribute('tabindex', 0);
  container.classList.add('modal-card');

  container.addEventListener('click', (event) => handleModalCardClick(event));

  const titleElement = document.createElement('h2');
  titleElement.innerHTML = title;
  container.append(titleElement);

  const planDetails = document.createElement('h3');
  planDetails.className = 'plan';

  const planCost = document.createElement('span');
  planCost.className = 'plan-cost';

  if (typeof plan === 'number') {
    const dollarSign = document.createElement('span');
    dollarSign.innerHTML = '$';
    planDetails.append(dollarSign);

    planCost.innerHTML = plan.toLocaleString();
    planDetails.append(planCost);

    const paymentFrequency = document.createElement('span');
    paymentFrequency.innerHTML = '+ IVA/mes';
    planDetails.append(paymentFrequency);
  } else {
    planCost.innerHTML = plan;
    planCost.style.fontSize = '1.5em';
    planDetails.append(planCost);
  }

  container.append(planDetails);

  const descriptionElement = document.createElement('p');
  descriptionElement.innerHTML = `${description} movimientos bancarios al mes`;
  container.append(descriptionElement);

  const callToActionButton = document.createElement('button');
  callToActionButton.className = 'call-to-action';
  callToActionButton.innerHTML = callToAction;
  container.append(callToActionButton);

  return container;
}

/** Create and add the Packages Modal to the dom*/
function packagesModal() {
  const modalContent = document.getElementById('packages');

  const modalToolbar = document.createElement('div');
  modalToolbar.classList.add('modal-toolbar');
  modalToolbar.style.display = 'none';

  const toolbarTitle = document.createElement('h2');
  toolbarTitle.className = 'toolbar-title';
  toolbarTitle.innerHTML = 'Escoge tu plan';
  modalToolbar.append(toolbarTitle);

  const closeModalButton = document.createElement('span');
  closeModalButton.id = 'close-modal';
  closeModalButton.innerHTML = '&times;';
  modalToolbar.append(closeModalButton);

  modalContent.append(modalToolbar);

  const plan1 = modalCard('Emprendedor', 1000, '1 - 30', 'Elegir');
  modalContent.append(plan1);
  const plan2 = modalCard('Emprendedor Plus', 2000, '31 - 100', 'Elegir');
  modalContent.append(plan2);
  const plan3 = modalCard('Empresarial', 3000, '101 - 300', 'Elegir');
  modalContent.append(plan3);
  const plan4 = modalCard(
    'Select',
    'Contáctanos para hacer un paquete a tus necesidades',
    '+300',
    'Cotizar paquete'
  );
  modalContent.append(plan4);

  const confirmPlanButton = document.createElement('div');
  confirmPlanButton.classList.add('confirm-plan');
  confirmPlanButton.style.display = 'none';
  confirmPlanButton.innerHTML = 'Seleccionar este plan';
  modalContent.append(confirmPlanButton);

  const goArrow = document.createElement('span');
  goArrow.innerHTML = '>';
  confirmPlanButton.append(goArrow);
}

/** Hides the modal
 * @param {HTMLElement} background Modal background
 * @param {HTMLElement} modal Modal element to be hidden
 */
async function hideModal(background, modal) {
  background.style.display = 'none';
  modal.classList.remove('show-in');

  // if this is the mobile modal wait for animation to finish
  if (window.innerWidth < 768) {
    const animationLapse = 500; // 500ms
    await new Promise((resolve) => setTimeout(() => resolve(), animationLapse));
  }

  modal.style.opacity = 0;
}

function createAndAppendCards() {
  const calculatorCard = introductionCard(
    '/resources/icons/budget.png',
    'Hacemos tu contabilidad mensual'
  );
  const percentageCard = introductionCard(
    '/resources/icons/percentage.png',
    'Calculamos tus impuestos'
  );
  const documentCard = introductionCard(
    '/resources/icons/document.png',
    'Presentamos tus declaraciones SAT'
  );
  const dollarCoinCard = introductionCard(
    '/resources/icons/dollar-coin.png',
    'Calculo, timbrado y envío de nómina'
  );

  const introductionCardsSection =
    document.getElementById('introduction-cards');
  introductionCardsSection.append(calculatorCard);
  introductionCardsSection.append(percentageCard);
  introductionCardsSection.append(documentCard);
  introductionCardsSection.append(dollarCoinCard);

  const step1 = initialStep('/resources/icons/edit.png', 'Agrega tu FIEL', 1);
  const step2 = initialStep(
    '/resources/icons/sync.png',
    'Sincroniza tus cuentas bancarias',
    2
  );
  const step3 = initialStep(
    '/resources/icons/file-download.png',
    'Recibe mensualmente tu declaración de impuestos',
    3
  );

  const stepsSection = document.getElementById('steps');
  stepsSection.append(step1);
  stepsSection.append(step2);
  stepsSection.append(step3);

  const modalBackground = document.getElementById('modal-background');
  packagesModal();

  const modalContent = document.getElementById('packages');

  // show modal
  const seePackagesButton = document.getElementById('see-packages');
  seePackagesButton.onclick = () => {
    modalBackground.style.display = 'block';
    modalContent.classList.add('show-in');
    modalContent.style.opacity = 1;
  };

  // hide modal using close button
  const closeModalButton = document.getElementById('close-modal');
  closeModalButton.onclick = async () =>
    hideModal(modalBackground, modalContent);

  // hide modal clicking outside of content
  window.onclick = async (event) => {
    if (event.target == modalBackground) {
      hideModal(modalBackground, modalContent);
    }
  };
}

createAndAppendCards();
