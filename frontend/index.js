async function sprintChallenge5() {
  // 👇 WORK ONLY BELOW THIS LINE 👇
  // 👇 WORK ONLY BELOW THIS LINE 👇
  // 👇 WORK ONLY BELOW THIS LINE 👇

  // 👇 ==================== TASK 1 START ==================== 👇

  // 🧠 Use Axios to GET learners and mentors.
  // ❗ Use the variables `mentors` and `learners` to store the data.
  // ❗ Use the await keyword when using axios.

  const mentorsResponse = await axios.get('http://localhost:3003/api/mentors');
  const learnersResponse = await axios.get('http://localhost:3003/api/learners');

  const mentors = mentorsResponse.data;
  const learners = learnersResponse.data;

  console.log('Mentors:', mentors);
  console.log('Learners:', learners);

  // 👆 ==================== TASK 1 END ====================== 👆

  // 👇 ==================== TASK 2 START ==================== 👇

  const learnersWithMentors = learners.map(learner => ({
    ...learner,
    mentors: learner.mentors.map(mentorId => {
      const filteredMentor = mentors.find(mentor => mentor.id === mentorId);
      return `${filteredMentor.firstName} ${filteredMentor.lastName}`;
    })
  }));

  console.log('Learners with mentor names:', learnersWithMentors);

  // 👆 ==================== TASK 2 END ====================== 👆

  const cardsContainer = document.querySelector('.cards');
  const info = document.querySelector('.info');
  info.textContent = 'No learner is selected';

  // 👇 ==================== TASK 3 START ==================== 👇

  learnersWithMentors.forEach(learner => {
    const card = document.createElement('div');
    card.className = 'card';

    const heading = document.createElement('h3');
    heading.className = 'learner-name';
    heading.textContent = learner.fullName;
    card.appendChild(heading);

    const email = document.createElement('div');
    email.className = 'learner-email';
    email.textContent = learner.email;
    card.appendChild(email);

    const mentorsHeading = document.createElement('h4');
    mentorsHeading.className = 'mentors-heading';
    mentorsHeading.textContent = 'Mentors:';
    card.appendChild(mentorsHeading);

    const mentorsList = document.createElement('ul');
    mentorsList.className = 'mentors-list';

    learner.mentors.forEach(mentor => {
      const mentorItem = document.createElement('li');
      mentorItem.textContent = mentor;
      mentorsList.appendChild(mentorItem);
    });

    card.appendChild(mentorsList);
    card.dataset.fullName = learner.fullName;
    cardsContainer.appendChild(card);

    card.addEventListener('click', evt => {
      const mentorsHeading = card.querySelector('h4');
      const didClickTheMentors = evt.target === mentorsHeading;
      const isCardSelected = card.classList.contains('selected');

      document.querySelectorAll('.card').forEach(crd => {
        crd.classList.remove('selected');
        crd.querySelector('h3').textContent = crd.dataset.fullName;
      });

      info.textContent = 'No learner is selected';

      if (!didClickTheMentors) {
        if (!isCardSelected) {
          card.classList.add('selected');
          heading.textContent += `, ID ${learner.id}`;
          info.textContent = `The selected learner is ${learner.fullName}`;
        }
      } else {
        card.classList.add('selected');
        if (mentorsHeading.classList.contains('open')) {
          mentorsHeading.classList.replace('open', 'closed');
        } else {
          mentorsHeading.classList.replace('closed', 'open');
        }
        if (!isCardSelected) {
          heading.textContent += `, ID ${learner.id}`;
          info.textContent = `The selected learner is ${learner.fullName}`;
        }
      }
    });
  });

  const footer = document.querySelector('footer');
  const currentYear = new Date().getFullYear();
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`;
}

// ❗ DO NOT CHANGE THIS CODE. WORK ONLY INSIDE TASKS 1, 2, 3
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5()
