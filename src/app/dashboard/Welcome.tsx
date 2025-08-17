// TypeScript interfaces and types
interface InterviewData {
  company: string;
  position: string;
  date: string;
  time: string;
  timestamp: Date;
}

interface CountdownTime {
  hours: number;
  minutes: number;
  seconds: number;
}

interface UserData {
  name: string;
  nextInterview?: InterviewData;
}

// Type for DOM elements
type CountdownElement = HTMLElement | null;
type ButtonElement = HTMLButtonElement | null;

// User data configuration
const userData: UserData = {
  name: "Vyakhya",
  nextInterview: {
    company: "Google",
    position: "SDE II",
    date: "Tomorrow",
    time: "2:00 PM",
    timestamp: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours from now
  }
};

// Countdown Timer Class
class CountdownTimer {
  private element: CountdownElement;
  private targetDate: Date;
  private intervalId: number | null = null;

  constructor(elementId: string, targetDate: Date) {
    this.element = document.getElementById(elementId);
    this.targetDate = targetDate;
    
    if (!this.element) {
      throw new Error(`Element with id "${elementId}" not found`);
    }
  }

  private calculateTimeLeft(): CountdownTime | null {
    const now = new Date();
    const timeDiff = this.targetDate.getTime() - now.getTime();

    if (timeDiff <= 0) {
      return null;
    }

    return {
      hours: Math.floor(timeDiff / (1000 * 60 * 60)),
      minutes: Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((timeDiff % (1000 * 60)) / 1000)
    };
  }

  private formatTime(time: CountdownTime): string {
    const pad = (num: number): string => num.toString().padStart(2, '0');
    return `${pad(time.hours)}:${pad(time.minutes)}:${pad(time.seconds)}`;
  }

  private updateDisplay(): void {
    if (!this.element) return;

    const timeLeft = this.calculateTimeLeft();
    
    if (timeLeft) {
      this.element.textContent = this.formatTime(timeLeft);
    } else {
      this.element.textContent = "Interview Time!";
      this.stop();
    }
  }

  public start(): void {
    this.updateDisplay(); // Initial update
    this.intervalId = window.setInterval(() => {
      this.updateDisplay();
    }, 1000);
  }

  public stop(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}

// Animation Controller Class
class AnimationController {
  private elements: NodeListOf<Element>;

  constructor(containerSelector: string) {
    const container = document.querySelector(containerSelector);
    this.elements = container ? container.querySelectorAll(':scope > *') : document.querySelectorAll('');
  }

  public animateEntrance(delay: number = 200): void {
    this.elements.forEach((el: Element, index: number) => {
      const element = el as HTMLElement;
      element.style.opacity = '0';
      element.style.transform = 'translateY(30px)';
      element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
      
      setTimeout(() => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }, index * delay);
    });
  }
}

// Button Handler Class
class ButtonHandler {
  private buttons: Map<string, () => void> = new Map();

  constructor() {
    this.initializeButtons();
  }

  private initializeButtons(): void {
    this.buttons.set('start-practicing', this.handleStartPracticing);
    this.buttons.set('view-study-plans', this.handleViewStudyPlans);
  }

  private handleStartPracticing = (): void => {
    console.log('Starting mock interview practice...');
    this.showNotification('🚀 Starting Mock Interview Practice!', 'Redirecting to interview platform...');
  }

  private handleViewStudyPlans = (): void => {
    console.log('Opening study plans...');
    this.showNotification('📚 Opening Study Plans!', 'Loading personalized practice plans...');
  }

  private showNotification(title: string, message: string): void {
    // In a real application, you might use a toast notification library
    alert(`${title}\n${message}`);
  }

  public attachEventListeners(): void {
    this.buttons.forEach((handler, buttonClass) => {
      const button = document.querySelector(`.${buttonClass}`) as ButtonElement;
      if (button) {
        button.addEventListener('click', handler);
      }
    });
  }
}

// Main Application Class
class WelcomeBanner {
  private countdownTimer: CountdownTimer | null = null;
  private animationController: AnimationController;
  private buttonHandler: ButtonHandler;

  constructor() {
    this.animationController = new AnimationController('.welcome-container');
    this.buttonHandler = new ButtonHandler();
  }

  private setInterviewDate(): Date {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(14, 0, 0, 0); // 2:00 PM tomorrow
    return tomorrow;
  }

  public initialize(): void {
    try {
      // Initialize countdown timer
      const interviewDate = this.setInterviewDate();
      this.countdownTimer = new CountdownTimer('countdown', interviewDate);
      this.countdownTimer.start();

      // Attach button event listeners
      this.buttonHandler.attachEventListeners();

      // Start entrance animations
      this.animationController.animateEntrance();

      console.log(`Welcome banner initialized for ${userData.name}`);
    } catch (error) {
      console.error('Failed to initialize welcome banner:', error);
    }
  }

  public destroy(): void {
    if (this.countdownTimer) {
      this.countdownTimer.stop();
    }
  }
}

// Utility functions
const formatUserName = (name: string): string => {
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
};

const generateHTML = (userData: UserData): string => {
  return `
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }

            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
                background: linear-gradient(135deg, #f8fffe 0%, #e8f5e8 100%);
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 20px;
            }

            .welcome-container {
                text-align: center;
                max-width: 900px;
                margin: 0 auto;
            }

            .brand-icon {
                width: 80px;
                height: 80px;
                background: linear-gradient(135deg, #00c851, #00a63f);
                border-radius: 20px;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 40px;
                box-shadow: 0 8px 25px rgba(0, 200, 81, 0.25);
                animation: iconFloat 3s ease-in-out infinite;
            }

            @keyframes iconFloat {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-5px); }
            }

            .brain-icon {
                font-size: 2.2em;
                color: white;
            }

            .main-heading {
                font-size: 3.2em;
                font-weight: 700;
                color: #2c3e50;
                line-height: 1.2;
                margin-bottom: 15px;
                letter-spacing: -0.02em;
            }

            .highlight-text {
                color: #00c851;
                position: relative;
            }

            .highlight-text::after {
                content: '';
                position: absolute;
                bottom: -5px;
                left: 0;
                width: 100%;
                height: 4px;
                background: linear-gradient(90deg, #00c851, #00a63f);
                border-radius: 2px;
                animation: underlineGrow 2s ease-out forwards;
            }

            @keyframes underlineGrow {
                0% { width: 0%; }
                100% { width: 100%; }
            }

            .subtitle {
                font-size: 1.3em;
                color: #7f8c8d;
                margin-bottom: 50px;
                font-weight: 400;
                line-height: 1.6;
            }

            .countdown-section {
                background: white;
                padding: 25px 35px;
                border-radius: 20px;
                margin-bottom: 40px;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
                border: 1px solid rgba(0, 200, 81, 0.1);
                display: inline-block;
                min-width: 300px;
            }

            .countdown-label {
                font-size: 1em;
                color: #7f8c8d;
                margin-bottom: 12px;
                font-weight: 500;
            }

            .timer-display {
                font-size: 2.2em;
                font-weight: 700;
                color: #00c851;
                font-family: 'Monaco', 'Menlo', monospace;
                letter-spacing: 0.05em;
            }

            .interview-info {
                margin-top: 12px;
                font-size: 0.95em;
                color: #34495e;
                font-weight: 500;
            }

            .button-group {
                display: flex;
                gap: 20px;
                justify-content: center;
                align-items: center;
                margin-bottom: 50px;
                flex-wrap: wrap;
            }

            .start-practicing {
                background: linear-gradient(135deg, #00c851, #00a63f);
                color: white;
                border: none;
                padding: 18px 40px;
                border-radius: 50px;
                font-size: 1.1em;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                box-shadow: 0 8px 25px rgba(0, 200, 81, 0.3);
                position: relative;
                overflow: hidden;
            }

            .start-practicing::before {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
                transition: left 0.5s;
            }

            .start-practicing:hover::before {
                left: 100%;
            }

            .start-practicing:hover {
                transform: translateY(-3px);
                box-shadow: 0 12px 35px rgba(0, 200, 81, 0.4);
            }

            .view-study-plans {
                background: white;
                color: #34495e;
                border: 2px solid #e1e8ed;
                padding: 16px 35px;
                border-radius: 50px;
                font-size: 1.1em;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
            }

            .view-study-plans:hover {
                border-color: #00c851;
                color: #00c851;
                transform: translateY(-2px);
                box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
            }

            .quote {
                font-size: 1.1em;
                color: #00c851;
                font-style: italic;
                font-weight: 500;
                opacity: 0.8;
            }

            .quote::before,
            .quote::after {
                content: '"';
                font-size: 1.5em;
                color: #00a63f;
                font-weight: bold;
            }

            .floating-elements {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                overflow: hidden;
                pointer-events: none;
                z-index: -1;
            }

            .floating-element {
                position: absolute;
                font-size: 1.5em;
                color: rgba(0, 200, 81, 0.1);
                animation: float 8s infinite linear;
            }

            .floating-element:nth-child(1) {
                top: 20%;
                left: 10%;
                animation-delay: 0s;
            }

            .floating-element:nth-child(2) {
                top: 60%;
                right: 15%;
                animation-delay: 2s;
            }

            .floating-element:nth-child(3) {
                top: 80%;
                left: 20%;
                animation-delay: 4s;
            }

            @keyframes float {
                0% { transform: translateY(0px) rotate(0deg); opacity: 0; }
                10% { opacity: 1; }
                90% { opacity: 1; }
                100% { transform: translateY(-100px) rotate(180deg); opacity: 0; }
            }

            @media (max-width: 768px) {
                .main-heading { font-size: 2.5em; }
                .subtitle { font-size: 1.1em; padding: 0 20px; }
                .button-group { flex-direction: column; align-items: stretch; max-width: 300px; margin: 0 auto 50px auto; }
                .countdown-section { margin: 0 10px 40px 10px; min-width: auto; }
                .timer-display { font-size: 1.8em; }
            }

            @media (max-width: 480px) {
                .main-heading { font-size: 2em; }
                .brand-icon { width: 60px; height: 60px; margin-bottom: 30px; }
                .brain-icon { font-size: 1.8em; }
            }
        </style>
    </head>
    <body>
        <div class="floating-elements">
            <div class="floating-element">🧠</div>
            <div class="floating-element">💡</div>
            <div class="floating-element">🎯</div>
        </div>

        <div class="welcome-container">
            <div class="brand-icon">
                <div class="brain-icon">🧠</div>
            </div>

            <h1 class="main-heading">
                From nervous to natural —<br>
                <span class="highlight-text">transform your interview skills.</span>
            </h1>

            <p class="subtitle">
                Hello ${formatUserName(userData.name)} 👋 Get instant SkilledAI feedback and personalized practice plans to help you ace your interviews!!
            </p>

            <div class="countdown-section">
                <div class="countdown-label">Next Interview In:</div>
                <div class="timer-display" id="countdown">00:00:00</div>
                <div class="interview-info">${userData.nextInterview?.company} - ${userData.nextInterview?.position} | ${userData.nextInterview?.date} ${userData.nextInterview?.time}</div>
            </div>

            <div class="button-group">
                <button class="start-practicing">
                    🚀 Start Practicing
                </button>
                <button class="view-study-plans">
                    📚 View Study Plans
                </button>
            </div>

            <p class="quote">Master Your Interviews with HireMind's Expert Insights.</p>
        </div>
    </body>
    </html>
  `;
};

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const app = new WelcomeBanner();
  app.initialize();

  // Cleanup on page unload
  window.addEventListener('beforeunload', () => {
    app.destroy();
  });
});

// Export classes for potential use in other modules

export {
  WelcomeBanner,
  // CountdownTimer,
  // AnimationController,
  // ButtonHandler,
  // userData,
  // type InterviewData,
  // type CountdownTime,
  // type UserData
};