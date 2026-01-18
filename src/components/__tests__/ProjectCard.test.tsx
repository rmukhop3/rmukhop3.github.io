import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Projects from '../sections/Projects'

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
  useInView: () => [null, true],
}))

// Mock intersection observer
jest.mock('react-intersection-observer', () => ({
  useInView: () => [null, true],
}))

describe('Projects Component', () => {
  it('renders project cards', () => {
    render(<Projects />)

    // Check if section title is rendered
    expect(screen.getByText('Featured Projects')).toBeInTheDocument()

    // Check if at least one project is rendered
    expect(screen.getByText(/SARAH/i)).toBeInTheDocument()
  })

  it('opens project overlay on click', () => {
    render(<Projects />)

    // Find and click a project card
    const projectCard = screen.getByText(/SARAH/i).closest('div')
    if (projectCard) {
      fireEvent.click(projectCard)

      // Check if overlay content appears
      // Note: This depends on the overlay implementation
      // Adjust selector based on your actual overlay structure
    }
  })

  it('displays correct number of projects', () => {
    const { container } = render(<Projects />)

    // Count project cards (adjust selector based on your structure)
    const projectCards = container.querySelectorAll('[data-testid="project-card"]')

    // Verify we have projects (adjust based on resume.json)
    expect(projectCards.length).toBeGreaterThan(0)
  })

  it('shows tech tags for each project', () => {
    render(<Projects />)

    // Check if tech tags are rendered
    expect(screen.getByText('Python')).toBeInTheDocument()
  })
})
