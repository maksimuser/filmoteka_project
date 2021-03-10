// const openModalBtn = document.querySelector('a[data-action="open-modal"]');
// const closeModalBtn = document.querySelector(
//   'button[data-action="close-modal"]',
// );
// const backdropRef = document.querySelector('.js-backdrop');

// openModalBtn.addEventListener('click', onOpenModal);
// closeModalBtn.addEventListener('click', onCloseModal);
// backdropRef.addEventListener('click', onBackDropClick);

// function onOpenModal(event) {
//   event.preventDefault();
//   window.addEventListener('keydown', onPressEscape);
//   document.body.classList.add('show-modal');
// }

// function onCloseModal() {
//   window.removeEventListener('keydown', onPressEscape);
//   document.body.classList.remove('show-modal');
// }

// function onBackDropClick(event) {
//   if (event.target === event.currentTarget) {
//     onCloseModal();
//   }
// }

// function onPressEscape(event) {
//   if (event.code === 'Escape') {
//     onCloseModal();
//   }
// }
// import * as basicLightbox from 'basiclightbox';
// import 'basiclightbox/src/styles/main.scss';

// const openModalBtn = document.querySelector('a[data-action="open-modal"]');

// const lightbox = () => {
//   openModalBtn.addEventListener('click', event => {
//     event.preventDefault();
//     const instance = basicLightbox.create(`<div class="modal-team"> 
//         <div class="container">
//           <h1 class="team-title">BLENDER TEAM</h1>
//           <ul class="team-list">
//             <li class="team-item">
//               <img
//                 class="team-image"
//                 src="../images/team/Maks.jpg"
//                 alt="Maksim Dema"
//                 width="120"
//                 height="120"
//               />
//               <h2 class="team-name">Maksim Dema</h2>
//               <h3 class="team-role">Team Lead</h3>
//               <a href="https://github.com/maksimuser">
//                 <svg class="follow-icon" width="25" height="25">
//                   <use href="../images/symbol-defs.svg#icon-github"></use></svg
//               ></a>
//             </li>
//             <li class="team-item">
//               <img
//                 class="team-image"
//                 src="../images/team/Julia_F.jpg"
//                 alt="Yulia Feduk"
//                 width="120"
//                 height="120"
//               />
//               <h2 class="team-name">Yulia Feduk</h2>
//               <h3 class="team-role">Scrum Master</h3>
//               <a href="https://github.com/JuliaFedyuk">
//                 <svg class="follow-icon" width="25" height="25">
//                   <use href="../images/symbol-defs.svg#icon-github"></use>
//                 </svg>
//               </a>
//             </li>
//             <li class="team-item">
//               <img
//                 class="team-image"
//                 src="../images/team/Roma.jpg"
//                 alt="Roman Nesterenko"
//                 width="120"
//                 height="120"
//               />
//               <h2 class="team-name">Roman Nesterenko</h2>
//               <h3 class="team-role">Firebase Master</h3>
//               <a href="https://github.com/Roman27011986">
//                 <svg class="follow-icon" width="25" height="25">
//                   <use href="../images/symbol-defs.svg#icon-github"></use>
//                 </svg>
//               </a>
//             </li>
//             <li class="team-item">
//               <img
//                 class="team-image"
//                 src="../images/team/Den.jpg"
//                 alt="Denis Akimov"
//                 width="120"
//                 height="120"
//               />
//               <h2 class="team-name">Denis Akimov</h2>
//               <h3 class="team-role">Front End Developer</h3>
//               <a href="https://github.com/Den-85-ukr">
//                 <svg class="follow-icon" width="25" height="25">
//                   <use href="../images/symbol-defs.svg#icon-github"></use>
//                 </svg>
//               </a>
//             </li>
//             <li class="team-item">
//               <img
//                 class="team-image"
//                 src="../images/team/Julia_B.jpg"
//                 alt="Yulia Bandura"
//                 width="120"
//                 height="120"
//               />
//               <h2 class="team-name">Yulia Bandura</h2>
//               <h3 class="team-role">Front End Developer</h3>
//               <a href="https://github.com/BYuliaL">
//                 <svg class="follow-icon" width="25" height="25">
//                   <use href="../images/symbol-defs.svg#icon-github"></use>
//                 </svg>
//               </a>
//             </li>
//             <li class="team-item">
//               <img
//                 class="team-image"
//                 src="../images/team/Artyom.jpg"
//                 alt="Artym Kupits"
//                 width="120"
//                 height="120"
//               />
//               <h2 class="team-name">Artym Kupits</h2>
//               <h3 class="team-role">Front End Developer</h3>
//               <a href="https://github.com/Artyom1910">
//                 <svg class="follow-icon" width="25" height="25">
//                   <use href="../images/symbol-defs.svg#icon-github"></use>
//                 </svg>
//               </a>
//             </li>
//             <li class="team-item">
//               <img
//                 class="team-image"
//                 src="../images/team/Sergey.jpg"
//                 alt="Sergey Melnik"
//                 width="120"
//                 height="120"
//               />
//               <h2 class="team-name">Sergey Melnik</h2>
//               <h3 class="team-role">Front End Developer</h3>
//               <a href="https://github.com/Mellsson">
//                 <svg class="follow-icon" width="25" height="25">
//                   <use href="../images/symbol-defs.svg#icon-github"></use>
//                 </svg>
//               </a>
//             </li>
//             <li class="team-item">
//               <img
//                 class="team-image"
//                 src="../images/team/Natali.jpg"
//                 alt="Natalia Dashkovska"
//                 width="120"
//                 height="120"
//               />
//               <h2 class="team-name">Natalia Dashkovska</h2>
//               <h3 class="team-role">Front End Developer</h3>
//               <a href="https://github.com/NatalyaDashkovska">
//                 <svg class="follow-icon" width="25" height="25">
//                   <use href="../images/symbol-defs.svg#icon-github"></use>
//                 </svg>
//               </a>
//             </li>
//             <li class="team-item">
//               <img
//                 class="team-image"
//                 src="../images/team/nophoto-man.jpg"
//                 alt="Andrii Rusan"
//                 width="120"
//                 height="120"
//               />
//               <h2 class="team-name">Andrii Rusan</h2>
//               <h3 class="team-role">Statist</h3>
//             </li>
//             <li class="team-item">
//               <img
//                 class="team-image"
//                 src="../images/team/Mushroom_cat.jpg"
//                 alt="Cat#1"
//                 width="120"
//                 height="120"
//               />
//               <h2 class="team-name">Mushroom</h2>
//               <h3 class="team-role">Senior cat#1</h3>
//             </li>
//             <li class="team-item">
//               <img
//                 class="team-image"
//                 src="../images/team/Greyse_cat.jpg"
//                 alt="Cat#2"
//                 width="120"
//                 height="120"
//               />
//               <h2 class="team-name">Greyse</h2>
//               <h3 class="team-role">Senior cat#2</h3>
//             </li>
//             <li class="team-item">
//               <img
//                 class="team-image"
//                 src="../images/team/Denis.jpg"
//                 alt="Denis Hvorostyany"
//                 width="120"
//                 height="120"
//               />
//               <h2 class="team-name">Denis Hvorostyany</h2>
//               <h3 class="team-role">Den-Mentor :)</h3>
//             </li>
//           </ul>
//           <button type="button" class="button-close" data-action="close-modal">
//             <svg class="icon-close">
//               <use href="../images/symbol-defs.svg#icon-form-close-x"></use>
//             </svg>
//           </button>
//         </div>
//       </div>`);
//     instance.show();
//   });
// };

// export default lightbox;
