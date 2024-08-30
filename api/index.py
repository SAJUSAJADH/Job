from flask import Flask, request, jsonify
from flask_cors import CORS
import spacy
import PyPDF2
import docx
import csv
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np



common_skills = [
    'Python', 'Java', 'JavaScript', 'C++', 'Machine Learning', 'Deep Learning',
    'Natural Language Processing', 'Data Science', 'Artificial Intelligence',
    'Cloud Computing', 'Cybersecurity', 'Networking', 'Database Management',
    'Web Development', 'Mobile App Development', 'DevOps', 'Agile', 'Scrum',
    'Project Management', 'Business Analysis', 'IT Service Management',
    'SQL', 'NoSQL', 'MongoDB', 'PostgreSQL', 'MySQL', 'Oracle',
    'HTML', 'CSS', 'React', 'Angular', 'Vue.js', 'Node.js', 'Express',
    'Ruby', 'Ruby on Rails', 'editing', 'PHP', 'Laravel', 'Symfony', 'WordPress',
    'AWS', 'Azure', 'Google Cloud', 'Kubernetes', 'Docker', 'Containerization',
    'CI/CD', 'Jenkins', 'Git', 'GitHub', 'GitLab', 'Bitbucket',
    'Data Visualization', 'Tableau', 'Power BI', 'D3.js', 'Matplotlib',
    'Statistics', 'R', 'SAS', 'SPSS', 'Excel', 'Google Analytics',
    'Digital Marketing', 'SEO', 'SEM', 'Social Media Marketing', 'Content Marketing',
    'UX Design', 'UI Design', 'Graphic Design', 'Photoshop', 'Sketch',
    'Product Management', 'Product Development', 'Product Design',
    'Business Intelligence', 'video', 'Data Warehousing', 'ETL', 'Data Governance',
    'ITIL', 'COBIT', 'ISO 27001', 'Compliance', 'Risk Management',
    'Help Desk', 'Technical Support', 'Customer Support', 'Customer Service',
    'Salesforce', 'CRM', 'ERP', 'SAP', 'Oracle ERP',
    'Blockchain', 'Cryptocurrency', 'Bitcoin', 'Ethereum', 'Smart Contracts',
    'Internet of Things', 'IoT', 'Robotics', 'Automation', 'Mechatronics',
    'Computer Vision', 'Image Processing', 'Signal Processing', 'Audio Processing',
    'Speech Recognition', 'Natural Language Generation', 'Chatbots',
    'Virtual Reality', 'Augmented Reality', 'Mixed Reality', 'AR/VR',
    'Cybersecurity Framework', 'NIST', 'HIPAA', 'PCI-DSS', 'GDPR',
    'Cloud Security', 'Network Security', 'Endpoint Security', 'Identity and Access Management',
    'Disaster Recovery', 'Business Continuity', 'IT Service Continuity',
    'Quality Assurance', 'Testing', 'QA Engineering', 'Test Automation',
    'DevSecOps', 'Security as Code', 'Compliance as Code',
    'Artificial Intelligence for IT Operations', 'AIOps', 'IT Operations Analytics',
    'Digital Transformation', 'IT Transformation', 'Business Transformation',
    'Innovation Management', 'Design Thinking', 'Lean Startup', 'Agile Methodologies',
    'Change Management', 'Organizational Change Management', 'Communication',
    'Stakeholder Management', 'Project Stakeholder Management', 'Team Management',
    'Time Management', 'Prioritization', 'Delegation', 'Leadership',
    'Communication Skills', 'Presentation Skills', 'Public Speaking', 'Storytelling',
    'Collaboration', 'Teamwork', 'Cross-functional Teams', 'Virtual Teams',
    'Emotional Intelligence', 'Empathy', 'Self-awareness', 'Social Skills',
    'Adaptability', 'Flexibility', 'Resilience', 'Stress Management',
    'Continuous Learning', 'Professional Development', 'Personal Development',
    'Mentorship', 'Coaching', 'Feedback', 'Performance Management',
    'Diversity and Inclusion', 'Unconscious Bias', 'Cultural Competence',
    'Workplace Culture', 'Employee Engagement', 'Employee Experience',
    'Talent Management', 'Talent Acquisition', 'Recruitment', 'Retention',
    'HR Analytics', 'Workforce Analytics', 'People Analytics',
    'Compensation and Benefits', 'Total Rewards', 'Employee Benefits',
    'Labor Relations', 'Employee Relations', 'Conflict Resolution',
    'Compliance and Risk Management', 'Employment Law', 'Regulatory Compliance',
    'Business Acumen', 'Financial Management', 'Accounting', 'Finance',
    'Marketing', 'Sales', 'Customer Success', 'Account Management',
    'Operations Management', 'Supply Chain Management', 'Logistics',
    'Procurement', 'Sourcing', 'Contract Management', 'Vendor Management',
    'Facilities Management', 'Real Estate', 'Construction', 'Project Management',
    'Sustainability', 'Corporate Social Responsibility', 'Environmental Management',
    'Health and Safety', 'Occupational Health and Safety', 'Wellness',
    'Business Ethics', 'Corporate Governance', 'Risk Management', 'Business Ethics', 'Corporate Governance', 'Risk Management', 'Compliance',
    'Internal Audit', 'External Audit', 'Financial Reporting', 'Taxation',
    'Treasury Management', 'Cash Management', 'Investment Management',
    'Pension Fund Management', 'Asset Management', 'Wealth Management',
    'Private Banking', 'Retail Banking', 'Corporate Banking', 'Investment Banking',
    'Merchant Banking', 'Private Equity', 'Venture Capital', 'Hedge Funds',
    'Mutual Funds', 'Exchange Traded Funds', 'Real Estate Investment Trusts',
    'Real Estate Development', 'Property Management', 'Facilities Management',
    'Construction Management', 'Project Management', 'Architecture',
    'Engineering', 'Interior Design', 'Landscape Architecture',
    'Urban Planning', 'Transportation Planning', 'Environmental Planning',
    'Economic Development', 'Community Development', 'Social Impact',
    'Non-Profit Management', 'Fundraising', 'Grant Writing', 'Philanthropy',
    'Corporate Social Responsibility', 'Sustainability', 'Environmental Management',
    'Health and Safety', 'Occupational Health and Safety', 'Wellness',
    'Employee Assistance Programs', 'Diversity and Inclusion', 'Unconscious Bias',
    'Cultural Competence', 'Workplace Culture', 'Employee Engagement',
    'Employee Experience', 'Talent Management', 'Talent Acquisition',
    'Recruitment', 'Retention', 'HR Analytics', 'Workforce Analytics',
    'People Analytics', 'Compensation and Benefits', 'Total Rewards',
    'Employee Benefits', 'Labor Relations', 'Employee Relations',
    'Conflict Resolution', 'Compliance and Risk Management', 'Employment Law',
    'Regulatory Compliance', 'Business Acumen', 'Financial Management',
    'Accounting', 'Finance', 'Marketing', 'Sales', 'Customer Success',
    'Account Management', 'Operations Management', 'Supply Chain Management',
    'Logistics', 'Procurement', 'Sourcing', 'Contract Management',
    'Vendor Management', 'Facilities Management', 'Real Estate',
    'Construction', 'Project Management', 'Sustainability',
    'Corporate Social Responsibility', 'Environmental Management',
    'Health and Safety', 'Occupational Health and Safety', 'Wellness',
    'Business Ethics', 'Corporate Governance', 'Risk Management', 'Compliance',
    'Internal Audit', 'External Audit', 'Financial Reporting', 'Taxation',
    'Treasury Management', 'Cash Management', 'Investment Management',
    'Pension Fund Management', 'Asset Management', 'Wealth Management',
    'Private Banking', 'Retail Banking', 'Corporate Banking', 'Investment Banking',
    'Merchant Banking', 'Private Equity', 'Venture Capital', 'Hedge Funds',
    'Mutual Funds', 'Exchange Traded Funds', 'Real Estate Investment Trusts',
    'Real Estate Development', 'Property Management', 'Facilities Management',
    'Construction Management', 'Project Management', 'Architecture',
    'Engineering']


app = Flask(__name__)
CORS(app)

# Load spaCy model for keyword extraction
nlp = spacy.load('en_core_web_sm')

def extract_keywords(text):
    """Extracts skills from text using spaCy."""
    doc = nlp(text)
    skills = set()
    for ent in doc.ents:
        if ent.text in common_skills:
            skills.add(ent.text)
    return list(skills)

def extract_text_from_pdf(file_stream):
    """Extracts text from a PDF file stream."""
    pdf_reader = PyPDF2.PdfReader(file_stream)
    text = ""
    for page in range(len(pdf_reader.pages)):
        text += pdf_reader.pages[page].extract_text()
    return text

def extract_text_from_docx(file_stream):
    """Extracts text from a DOCX file stream."""
    doc = docx.Document(file_stream)
    text = "\n".join([para.text for para in doc.paragraphs])
    return text
#
def process_resume(user_id, file_stream, file_type):
    """Processes a resume file to extract keywords based on the file type."""
    if file_type == 'application/pdf':
        text = extract_text_from_pdf(file_stream)
    elif file_type == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        text = extract_text_from_docx(file_stream)
    else:
        raise ValueError("Unsupported file type")

    # Extract keywords from text
    keywords = extract_keywords(text)
    
    return {"userId": user_id, "keywords": keywords}

def recommend_jobs(user_id, jobs, csv_file):
    # Load the CSV file
    df = pd.read_csv(csv_file, header=None)

    # Get the user's skills from the CSV file
    user_skills = []
    for index, row in df.iterrows():
        if row[0] == user_id:
            user_skills = row[1:].tolist()
            break

    # Create a TF-IDF vectorizer
    vectorizer = TfidfVectorizer()

    # Fit the vectorizer to the user's skills
    user_vector = vectorizer.fit_transform([' '.join(user_skills)])

    # Iterate over the jobs
    recommended_jobs = []
    for job in jobs:
        # Extract the skills from the job description
        job_skills = extract_keywords(job['description'])
        print(job_skills)

        # Create a TF-IDF vector for the job skills
        job_vector = vectorizer.transform([' '.join(skill) for skill in job_skills])
        print(job_vector)

        # Calculate the cosine similarity between the user's skills and the job skills
        similarity = cosine_similarity(user_vector, job_vector).mean()
        print(similarity)

        # If the similarity is above a certain threshold, add the job to the recommended list
        if similarity > 0.2:
            recommended_jobs.append(job)

    return recommended_jobs

@app.route('/api', methods=['GET'])
def home():
    return 'Welcome to the flask Service!'

@app.route('/api/extract_keywords', methods=['POST'])
def extract_keywords_endpoint():
    user_id = request.form['userId']
    resume_file = request.files['resume']
    file_type = resume_file.mimetype

    # Process the resume file
    result = process_resume(user_id, resume_file.stream, file_type)

    # Path to the CSV file
    csv_file_path = 'api/user_skills/keywords.csv'
    
    # Read existing data
    existing_data = []
    user_found = False
    with open(csv_file_path, 'r', newline='') as csvfile:
        reader = csv.reader(csvfile)
        for row in reader:
            if row and row[0] == user_id:
                existing_data.append([user_id] + result['keywords'])
                user_found = True
            else:
                existing_data.append(row)
    
    # Add new data if user ID not found
    if not user_found:
        existing_data.append([user_id] + result['keywords'])
    
    # Write updated data back to the CSV file
    with open(csv_file_path, 'w', newline='') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerows(existing_data)

    return jsonify({'message': 'Keywords extracted and updated successfully'})

@app.route('/api/recommend_jobs', methods=['POST'])
def recommend_jobs_api():
    try:
        user_id = request.json['user_id']
        jobs = request.json['jobs']
        csv_file = 'api/user_skills/keywords.csv'

        recommended_jobs = recommend_jobs(user_id, jobs, csv_file)

        return jsonify(recommended_jobs)
    except:
        return jsonify([])

#
if __name__ == "__main__":
    app.run(debug=True)