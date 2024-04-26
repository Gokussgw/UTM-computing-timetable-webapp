class SubjectManager {
    constructor() {
        this.baseUrl = "http://web.fc.utm.my/ttms/web_man_webservice_json.cgi";
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

    // Fetch the subjects of the latest semester
    async fetchLatestSemesterSubjects(studentId) {
        const subjects = await this.fetchStudentSubjects(studentId);
        
        // Determine the latest session
        const latestSession = subjects.reduce((latest, subject) => {
            return (latest.sesi < subject.sesi) ? subject : latest;
        }, subjects[0]);

        // Filter subjects for the latest semester
        const latestSemesterSubjects = subjects.filter(subject => {
            return subject.sesi === latestSession.sesi && subject.semester === latestSession.semester;
        });

        return latestSemesterSubjects;
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

