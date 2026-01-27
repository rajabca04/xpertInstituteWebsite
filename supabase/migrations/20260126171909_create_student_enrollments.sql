/*
  # Create student enrollments table

  1. New Tables
    - `student_enrollments`
      - `id` (uuid, primary key)
      - `full_name` (text, required) - Student's full name
      - `email` (text, required) - Student's email address
      - `phone` (text, required) - Student's phone number
      - `course` (text, required) - Selected course (BCA, MCA, BA, BS, MA, MBA, MS, BLIS, MBLIS)
      - `address` (text, required) - Student's complete address
      - `created_at` (timestamptz) - Timestamp of enrollment submission
  
  2. Security
    - Enable RLS on `student_enrollments` table
    - Add policy for inserting enrollments (public access for form submission)
    - Add policy for authenticated users to view all enrollments (for admin purposes)

  3. Important Notes
    - This table stores all student enrollment form submissions
    - Public users can submit enrollments but cannot read them
    - Only authenticated users (admins) can view enrollment data
*/

CREATE TABLE IF NOT EXISTS student_enrollments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  course text NOT NULL,
  address text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE student_enrollments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit enrollment"
  ON student_enrollments FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view enrollments"
  ON student_enrollments FOR SELECT
  TO authenticated
  USING (true);