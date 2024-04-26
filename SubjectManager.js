class SubjectManager {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    // Fetch all subjects for a given student ID
    async fetchStudentSubjects(studentId) {
        const url = `${this.baseUrl}?entity=pelajar_subjek&no_matrik=${studentId}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching student subjects:", error);
            return [];
        }
    }

    // Filter subjects by session and semester
    filterSubjects(subjects, sesi, semester) {
        return subjects.filter(subject => subject.sesi === sesi && subject.semester === parseInt(semester, 10));
    }

    // Fetch the timetable for a specific subject
    async fetchSubjectTimetable(kodSubjek, sesi, semester, seksyen) {
        const url = `${this.baseUrl}?entity=jadual_subjek&sesi=${sesi}&semester=${semester}&kod_subjek=${kodSubjek}&seksyen=${seksyen}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching subject timetable:", error);
            return [];
        }
    }
}

