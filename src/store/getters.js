const getters = {
    youngStudents: state => state.students.filter(person => person.age < 30)
};

export default getters;