const loadPhone = async(searchText='13', isShowAll) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones, isShowAll)
}

const displayPhones = (phones, isShowAll) =>{
    const phoneContainer = document.getElementById('phone-container')

    // clear phone container cards before adding new cards
    phoneContainer.textContent = '';

    // display show all button if there are more than 12 phones
    const showAllContainer = document.getElementById('show-all-container')
    if(phones.length > 12 && !isShowAll){
        showAllContainer.classList.remove('hidden')
    }else{
        showAllContainer.classList.add('hidden')
    }

    // console.log('is show all', isShowAll)

    // display only first 12 phone if not show all
    if(!isShowAll){
        phones = phones.slice(0, 12)
    }

    phones.forEach(phone => {
        // console.log(phone)
        const phoneCard = document.createElement('div')
        phoneCard.classList = `card bg-gray-100 p-4 text-black shadow-xl`;

        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name} </h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-center">
            <button onclick="handleShowDatails('${phone.slug}'); show_datails_modal.showModal()" class="btn btn-primary text-white">SHOW DETAILS</button>
            </div>
        </div>
        `;
        phoneContainer.appendChild(phoneCard)
    });

    // hide loading spinner
    toggleLoadingSpinner(false)
}

// hanle search
const handleSearch = (isShowAll) => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText)
    toggleLoadingSpinner(true)
    loadPhone(searchText, isShowAll)
}

const toggleLoadingSpinner = (isLoading) =>{
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden')
    }
    else{
        loadingSpinner.classList.add('hidden')
    }
}

const handleShowDatails = async(id) => {
    // console.log('clickde', id)
    // load single phone data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json();
    // console.log(data)
    const phone = data.data;
    showPhoneDatails(phone)
}

// show phone datails
const showPhoneDatails = (phone) =>{
    console.log(phone)
    const phoneName = document.getElementById('show-details-phone-name');
    phoneName.innerText = phone.name;

    const showDetailsContainer = document.getElementById('show-details-container')
    showDetailsContainer.innerHTML = `
      <img src="${phone.image}" alt=""/>
      <p><span>Storage: </span>${phone?.mainFeatures?.storage}</p>
      <p><span>Display Size: </span>${phone?.mainFeatures?.displaySize}</p>
      <p><span>Slug: </span>${phone?.slug}</p>
      <p><span>GPS: </span>${phone?.others.GPS}</p>
    `

    // show the modal
    show_datails_modal.showModal()
}

// Handle Show All
const handleShowAll = () => {
    handleSearch(true)
}

loadPhone()