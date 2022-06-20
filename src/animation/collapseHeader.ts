const collapseHeader = () => {
    const header = document.getElementById('header');
    if (header) {
        header.classList.add('header-scrolled');
    }
};

export default collapseHeader;