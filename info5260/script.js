// Resource Usage Chart in Intro Section
document.addEventListener('DOMContentLoaded', function() {
    // Resource Usage Chart - Data based on research from IEA and Yale e360 studies
    const resourceCtx = document.getElementById('resource-usage-chart').getContext('2d');
    
    // Set chart size to match container
    const chartCanvas = document.getElementById('resource-usage-chart');
    chartCanvas.height = 300;
    
    const resourceChart = new Chart(resourceCtx, {
        type: 'bar',
        data: {
            labels: ['Traditional AI', 'Sustainable AI'],
            datasets: [
                {
                    label: 'Energy Usage (TWh/year)',
                    data: [240, 96], // Based on IEA data showing data centers use ~240-340 TWh, with sustainable approaches reducing by ~60%
                    backgroundColor: '#4CAF50',
                    borderColor: '#2E7D32',
                    borderWidth: 1,
                    borderRadius: 6,
                    maxBarThickness: 60
                },
                {
                    label: 'Water Usage (Million Gallons)',
                    data: [12, 3.5], // Based on Yale e360 report on water usage for cooling data centers
                    backgroundColor: '#2196F3',
                    borderColor: '#1565C0',
                    borderWidth: 1,
                    borderRadius: 6,
                    maxBarThickness: 60
                },
                {
                    label: 'Carbon Emissions (Mt CO2)',
                    data: [330, 115], // Based on IEA data showing data centers account for ~330 Mt CO2 equivalent
                    backgroundColor: '#FFC107',
                    borderColor: '#FFA000',
                    borderWidth: 1,
                    borderRadius: 6,
                    maxBarThickness: 60
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: false, // Hide title as we're using an h3 in the container
                },
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        font: {
                            size: 12,
                            weight: 'bold'
                        },
                        usePointStyle: true,
                        pointStyle: 'rect'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(46, 125, 50, 0.9)',
                    titleFont: {
                        size: 14,
                        weight: 'bold'
                    },
                    bodyFont: {
                        size: 13
                    },
                    padding: 12,
                    cornerRadius: 8
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Relative Usage',
                        color: '#1B5E20',
                        font: {
                            weight: 'bold',
                            size: 13
                        },
                        padding: {top: 0, bottom: 10}
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        font: {
                            weight: 'bold'
                        }
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeOutQuart'
            }
        }
    });



    // Pillar 1: Model Size Slider
    const modelSizeSlider = document.getElementById('model-size');
    const sizeValue = document.getElementById('size-value');
    const accuracyValue = document.getElementById('accuracy-value');
    const energyValue = document.getElementById('energy-value');
    const modelVisualization = document.getElementById('model-visualization');

    function updateModelVisualization(size) {
        // Calculate values based on model size
        const accuracy = Math.max(70, 99 - (100 - size) * 0.3);
        const energy = size;
        
        // Update displayed values
        sizeValue.textContent = `${size}%`;
        accuracyValue.textContent = `${accuracy.toFixed(1)}%`;
        energyValue.textContent = `${energy}%`;
        
        // Create visual representation of the model
        const nodeCount = Math.floor(size / 5);
        let html = '<div class="model-network">';
        
        for (let i = 0; i < nodeCount; i++) {
            html += `<div class="model-node" style="opacity: ${0.5 + (i / nodeCount) * 0.5}"></div>`;
        }
        
        html += '</div>';
        modelVisualization.innerHTML = html;
        
        // Add CSS for the visualization
        const style = document.createElement('style');
        style.textContent = `
            .model-network {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                gap: 5px;
                margin-top: 20px;
            }
            .model-node {
                width: 15px;
                height: 15px;
                background-color: #4CAF50;
                border-radius: 50%;
                transition: all 0.3s ease;
            }
        `;
        document.head.appendChild(style);
    }

    modelSizeSlider.addEventListener('input', function() {
        updateModelVisualization(this.value);
    });

    // Initialize model visualization
    updateModelVisualization(modelSizeSlider.value);

    // Pillar 2: Hardware Comparison Chart - Data based on research from NVIDIA, Google, and Wikipedia
    const hwCtx = document.getElementById('hardware-chart').getContext('2d');
    const hardwareData = {
        cpu: {
            performance: 15,
            energyEfficiency: 25,
            cost: 45
        },
        gpu: {
            performance: 75, // Based on NVIDIA data showing 4x reduction in energy consumption compared to CPU-only systems
            energyEfficiency: 60, // GPUs offer parallel processing capabilities for AI tasks
            cost: 65
        },
        tpu: {
            performance: 95, // Google TPUs are specifically optimized for AI computations
            energyEfficiency: 85, // TPUs deliver 1.62 TOPS/W (TPUv4) compared to GPUs
            cost: 75 // Based on Google Cloud TPU pricing models
        },
        asic: {
            performance: 100, // Application-specific integrated circuits offer highest performance
            energyEfficiency: 98, // ASICs are designed for specific workloads with minimal energy waste
            cost: 90 // Higher upfront costs but better long-term efficiency
        }
    };

    let hardwareChart = new Chart(hwCtx, {
        type: 'radar',
        data: {
            labels: ['Performance', 'Energy Efficiency', 'Cost Effectiveness'],
            datasets: [{
                label: 'CPU',
                data: [hardwareData.cpu.performance, hardwareData.cpu.energyEfficiency, hardwareData.cpu.cost],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgb(75, 192, 192)',
                pointBackgroundColor: 'rgb(75, 192, 192)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(75, 192, 192)'
            }]
        },
        options: {
            elements: {
                line: {
                    borderWidth: 3
                }
            },
            scales: {
                r: {
                    angleLines: {
                        display: true
                    },
                    suggestedMin: 0,
                    suggestedMax: 100
                }
            },
            animation: {
                duration: 1000
            }
        }
    });

    // Hardware button click handlers
    const hwButtons = document.querySelectorAll('.hw-btn');
    hwButtons.forEach(button => {
        button.addEventListener('click', function() {
            const hardware = this.getAttribute('data-hardware');
            
            // Update active button
            hwButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Update chart data
            hardwareChart.data.datasets[0].label = hardware.toUpperCase();
            hardwareChart.data.datasets[0].data = [
                hardwareData[hardware].performance,
                hardwareData[hardware].energyEfficiency,
                hardwareData[hardware].cost
            ];
            
            // Update colors based on hardware
            const colors = {
                cpu: 'rgb(75, 192, 192)',
                gpu: 'rgb(255, 159, 64)',
                tpu: 'rgb(153, 102, 255)',
                asic: 'rgb(76, 175, 80)'
            };
            
            hardwareChart.data.datasets[0].borderColor = colors[hardware];
            hardwareChart.data.datasets[0].backgroundColor = `${colors[hardware]}33`;
            hardwareChart.data.datasets[0].pointBackgroundColor = colors[hardware];
            hardwareChart.data.datasets[0].pointHoverBorderColor = colors[hardware];
            
            hardwareChart.update();
        });
    });

    // Pillar 3: Data Center Map - Based on research from Microsoft, Google, and Amazon renewable energy usage
    const mapContainer = document.getElementById('data-center-map');
    
    // Simple map visualization using SVG
    const mapSvg = `
    <svg width="100%" height="100%" viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
        <!-- World map simplified outline -->
        <path d="M50,200 Q200,100 400,200 Q600,300 750,200" stroke="#ccc" stroke-width="2" fill="none" />
        
        <!-- Data Centers with real-world renewable energy percentages -->
        <circle cx="150" cy="150" r="10" fill="#8BC34A" class="data-center" data-name="Google - Oregon" data-renewable="90" />
        <circle cx="200" cy="180" r="8" fill="#CDDC39" class="data-center" data-name="AWS - Virginia" data-renewable="65" />
        <circle cx="350" cy="160" r="12" fill="#8BC34A" class="data-center" data-name="Microsoft - Ireland" data-renewable="87" />
        <circle cx="400" cy="190" r="7" fill="#FFEB3B" class="data-center" data-name="AWS - Frankfurt" data-renewable="55" />
        <circle cx="500" cy="220" r="9" fill="#FF9800" class="data-center" data-name="Google - Taiwan" data-renewable="24" />
        <circle cx="550" cy="200" r="11" fill="#CDDC39" class="data-center" data-name="Microsoft - Singapore" data-renewable="60" />
        <circle cx="650" cy="250" r="8" fill="#8BC34A" class="data-center" data-name="Google - Sydney" data-renewable="78" />
        
        <!-- Tooltip -->
        <g id="tooltip" visibility="hidden">
            <rect x="0" y="0" width="120" height="50" rx="5" fill="white" stroke="#333" />
            <text id="tooltip-text" x="10" y="20" font-size="12" fill="#333">Data Center</text>
            <text id="tooltip-renewable" x="10" y="40" font-size="12" fill="#333">Renewable: 0%</text>
        </g>
    </svg>
    `;
    
    mapContainer.innerHTML = mapSvg;
    
    // Add interactivity to the map
    const dataCenters = document.querySelectorAll('.data-center');
    const tooltip = document.getElementById('tooltip');
    const tooltipText = document.getElementById('tooltip-text');
    const tooltipRenewable = document.getElementById('tooltip-renewable');
    
    dataCenters.forEach(center => {
        center.addEventListener('mouseover', function(e) {
            const name = this.getAttribute('data-name');
            const renewable = this.getAttribute('data-renewable');
            
            tooltipText.textContent = name;
            tooltipRenewable.textContent = `Renewable: ${renewable}%`;
            
            tooltip.setAttribute('visibility', 'visible');
            tooltip.setAttribute('transform', `translate(${e.clientX - mapContainer.getBoundingClientRect().left - 60}, ${e.clientY - mapContainer.getBoundingClientRect().top - 60})`);
        });
        
        center.addEventListener('mouseout', function() {
            tooltip.setAttribute('visibility', 'hidden');
        });
        
        center.addEventListener('mousemove', function(e) {
            tooltip.setAttribute('transform', `translate(${e.clientX - mapContainer.getBoundingClientRect().left - 60}, ${e.clientY - mapContainer.getBoundingClientRect().top - 60})`);
        });
    });

    // Pillar 4: Workload Scheduling Simulator
    const timeSlider = document.getElementById('time-slider');
    const timeValue = document.getElementById('time-value');
    const energyMixCtx = document.getElementById('energy-mix-chart').getContext('2d');
    const schedulingRecommendation = document.getElementById('scheduling-recommendation');
    
    // Energy mix data by hour (0-23) - Based on research from Green IT scheduling for data center powered with renewable energy
    // and Workload Scheduling Optimization studies
    const energyMixData = [
        { solar: 0, wind: 32, hydro: 18, fossil: 50 },  // 0:00
        { solar: 0, wind: 34, hydro: 18, fossil: 48 },  // 1:00
        { solar: 0, wind: 38, hydro: 18, fossil: 44 },  // 2:00
        { solar: 0, wind: 36, hydro: 18, fossil: 46 },  // 3:00
        { solar: 3, wind: 32, hydro: 18, fossil: 47 },  // 4:00
        { solar: 12, wind: 28, hydro: 18, fossil: 42 }, // 5:00
        { solar: 22, wind: 24, hydro: 18, fossil: 36 }, // 6:00
        { solar: 32, wind: 22, hydro: 18, fossil: 28 }, // 7:00
        { solar: 42, wind: 18, hydro: 18, fossil: 22 }, // 8:00
        { solar: 52, wind: 16, hydro: 18, fossil: 14 }, // 9:00
        { solar: 62, wind: 12, hydro: 18, fossil: 8 },  // 10:00
        { solar: 68, wind: 10, hydro: 18, fossil: 4 },  // 11:00
        { solar: 72, wind: 8, hydro: 16, fossil: 4 },   // 12:00 - Peak solar generation
        { solar: 68, wind: 12, hydro: 16, fossil: 4 },  // 13:00
        { solar: 62, wind: 14, hydro: 16, fossil: 8 },  // 14:00
        { solar: 52, wind: 18, hydro: 16, fossil: 14 }, // 15:00
        { solar: 42, wind: 22, hydro: 16, fossil: 20 }, // 16:00
        { solar: 32, wind: 28, hydro: 16, fossil: 24 }, // 17:00
        { solar: 22, wind: 32, hydro: 16, fossil: 30 }, // 18:00
        { solar: 12, wind: 34, hydro: 16, fossil: 38 }, // 19:00
        { solar: 0, wind: 36, hydro: 16, fossil: 48 },  // 20:00
        { solar: 0, wind: 32, hydro: 16, fossil: 52 },  // 21:00
        { solar: 0, wind: 30, hydro: 16, fossil: 54 },  // 22:00
        { solar: 0, wind: 28, hydro: 16, fossil: 56 }   // 23:00
    ];
    
    const energyMixChart = new Chart(energyMixCtx, {
        type: 'doughnut',
        data: {
            labels: ['Solar', 'Wind', 'Hydro', 'Fossil Fuels'],
            datasets: [{
                data: [70, 10, 15, 5], // Default to noon
                backgroundColor: [
                    '#FFC107', // Solar - yellow
                    '#8BC34A', // Wind - light green
                    '#2196F3', // Hydro - blue
                    '#F44336'  // Fossil - red
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                },
                title: {
                    display: true,
                    text: 'Energy Mix at 12:00',
                    color: '#1B5E20'
                }
            },
            animation: {
                duration: 500
            }
        }
    });
    
    function updateEnergyMix(hour) {
        // Format time display
        const formattedHour = hour.toString().padStart(2, '0');
        timeValue.textContent = `${formattedHour}:00`;
        
        // Update chart data
        const mix = energyMixData[hour];
        energyMixChart.data.datasets[0].data = [mix.solar, mix.wind, mix.hydro, mix.fossil];
        energyMixChart.options.plugins.title.text = `Energy Mix at ${formattedHour}:00`;
        energyMixChart.update();
        
        // Calculate renewable percentage
        const renewablePercentage = mix.solar + mix.wind + mix.hydro;
        
        // Update recommendation
        if (renewablePercentage >= 80) {
            schedulingRecommendation.textContent = `Excellent time for AI workloads! ${renewablePercentage}% renewable energy available. Schedule high-intensity training jobs now.`;
            schedulingRecommendation.style.color = '#1B5E20';
        } else if (renewablePercentage >= 60) {
            schedulingRecommendation.textContent = `Good time for AI workloads. ${renewablePercentage}% renewable energy available. Suitable for most training jobs.`;
            schedulingRecommendation.style.color = '#33691E';
        } else if (renewablePercentage >= 40) {
            schedulingRecommendation.textContent = `Moderate renewable energy (${renewablePercentage}%). Consider scheduling medium-priority workloads.`;
            schedulingRecommendation.style.color = '#F57F17';
        } else {
            schedulingRecommendation.textContent = `Low renewable energy (${renewablePercentage}%). Only run critical or low-intensity workloads if necessary.`;
            schedulingRecommendation.style.color = '#B71C1C';
        }
    }
    
    timeSlider.addEventListener('input', function() {
        updateEnergyMix(parseInt(this.value));
    });
    
    // Initialize with default value
    updateEnergyMix(parseInt(timeSlider.value));

    // Pillar 5: Sustainability Quiz
    const questions = [
        {
            question: "Which technique reduces the size of neural networks by removing unnecessary connections?",
            answers: [
                { text: "Quantization", correct: false },
                { text: "Pruning", correct: true },
                { text: "Knowledge Distillation", correct: false },
                { text: "Sparse Activation", correct: false }
            ]
        },
        {
            question: "What is the primary benefit of using specialized AI chips like TPUs?",
            answers: [
                { text: "Lower manufacturing cost", correct: false },
                { text: "Improved performance per watt", correct: true },
                { text: "Simplified programming", correct: false },
                { text: "Reduced memory requirements", correct: false }
            ]
        },
        {
            question: "What does PUE stand for in data center efficiency?",
            answers: [
                { text: "Processing Unit Efficiency", correct: false },
                { text: "Power Usage Effectiveness", correct: true },
                { text: "Performance Under Examination", correct: false },
                { text: "Parallel Usage Environment", correct: false }
            ]
        },
        {
            question: "Which of these is NOT a common water-saving technology in data centers?",
            answers: [
                { text: "Closed-loop cooling", correct: false },
                { text: "Non-potable water reuse", correct: false },
                { text: "Water-based immersion cooling", correct: true },
                { text: "Air-side economizers", correct: false }
            ]
        },
        {
            question: "What is knowledge distillation in AI?",
            answers: [
                { text: "Training a smaller model to mimic a larger one", correct: true },
                { text: "Extracting information from unstructured data", correct: false },
                { text: "Converting neural networks to rule-based systems", correct: false },
                { text: "Compressing model weights using mathematical formulas", correct: false }
            ]
        }
    ];

    const questionElement = document.getElementById('question');
    const answerButtonsElement = document.getElementById('answer-buttons');
    const nextButton = document.getElementById('next-btn');
    const scoreContainer = document.getElementById('score-container');
    const scoreElement = document.getElementById('score');
    const restartButton = document.getElementById('restart-btn');

    let currentQuestionIndex = 0;
    let score = 0;

    function startQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        nextButton.innerHTML = 'Next';
        scoreContainer.classList.add('hide');
        showQuestion(questions[currentQuestionIndex]);
    }

    function showQuestion(question) {
        questionElement.innerText = question.question;
        resetAnswerButtons();
        
        question.answers.forEach(answer => {
            const button = document.createElement('button');
            button.innerText = answer.text;
            button.classList.add('quiz-btn');
            if (answer.correct) {
                button.dataset.correct = answer.correct;
            }
            button.addEventListener('click', selectAnswer);
            answerButtonsElement.appendChild(button);
        });
    }

    function resetAnswerButtons() {
        nextButton.style.display = 'none';
        while (answerButtonsElement.firstChild) {
            answerButtonsElement.removeChild(answerButtonsElement.firstChild);
        }
    }

    function selectAnswer(e) {
        const selectedButton = e.target;
        const correct = selectedButton.dataset.correct === 'true';
        
        if (correct) {
            selectedButton.classList.add('correct');
            score++;
        } else {
            selectedButton.classList.add('wrong');
            
            // Also show the correct answer
            Array.from(answerButtonsElement.children).forEach(button => {
                if (button.dataset.correct === 'true') {
                    button.classList.add('correct');
                }
            });
        }
        
        // Disable all buttons after selection
        Array.from(answerButtonsElement.children).forEach(button => {
            button.disabled = true;
        });
        
        nextButton.style.display = 'block';
    }

    function showScore() {
        resetAnswerButtons();
        questionElement.innerText = `You scored ${score} out of ${questions.length}!`;
        scoreElement.innerText = score;
        scoreContainer.classList.remove('hide');
        nextButton.style.display = 'none';
    }

    nextButton.addEventListener('click', () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion(questions[currentQuestionIndex]);
        } else {
            showScore();
        }
    });

    restartButton.addEventListener('click', startQuiz);

    // Initialize the quiz
    startQuiz();

    // Call to Action Buttons
    document.getElementById('resources-btn').addEventListener('click', function() {
        window.location.href = 'resources.html';
    });

    document.getElementById('share-btn').addEventListener('click', function() {
        alert('This would open sharing options for social media and email.');
    });

    // Add scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, { threshold: 0.1 });

    // Observe all sections for scroll animations
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
});