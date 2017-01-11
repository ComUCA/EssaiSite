# -*- coding: utf-8 -*-

import re

import pprint
pp = pprint.PrettyPrinter(indent=4)


class ERC(object):

    def __init__(self):
        super(ERC, self).__init__()

        self.erc = """
        SH1 Individuals, institutions and markets: economics, finance and management
        SH2 Institutions, values, beliefs and behaviour: sociology, social anthropology, political science, law, communication, social studies of science and technology
        SH3 Environment and society: environmental studies, demography, social geography, urban and regional studies
        SH4 The Human Mind and its complexity: cognition, psychology, linguistics, philosophy and education
        SH5 Cultures and cultural production: literature, visual and performing arts, music, cultural and comparative studies
        SH6 The study of the human past: archaeology, history and memory
        PE1 Mathematical foundations: all areas of mathematics, pure and applied, plus mathematical foundations of computer science, mathematical physics and statistics
        PE2 Fundamental constituents of matter:particle, nuclear, plasma, atomic, molecular, gas, and optical physics
        PE3 Condensed matter physics: structure, electronic properties, fluids, nanosciences
        PE4 Physical and Analytical Chemical sciences: analytical chemistry, chemical theory, physical chemistry/chemical physics
        PE5 Materials and Synthesis: materials synthesis, structure-properties relations, functional and advanced materials, molecular architecture, organic chemistry
        PE6 Computer science and informatics: informatics and information systems, computer science, scientific computing, intelligent systems
        PE7 Systems and communication engineering: electronic, communication, optical and systems engineering
        PE8 Products and process engineering: product design, process design and control, construction methods, civil engineering, energy systems, material engineering
        PE9 Universe sciences: astro-physics/chemistry/biology ; solar system; stellar, galactic and extragalactic astronomy, planet ary systems, cosmology; space science, instrumentation
        PE10 Earth system science: physical geography, geology, geophysics, meteorology, oceanography, climatology, ecology, global environmental change,biogeochemical cycles, natural resources management
        LS1 Molecular and Structural Biology and Biochemistry: molecular biology, biochemistry, biophysics, structural biology, biochemistry of signal transduction
        LS2 Genetics, Genomics, Bioinformatics and Systems Biology: genetics, population genetics, molecular genetics, genomics, transcriptomics, proteomics, metabolomics, bioinformatics, computational biology, biostatistics, biological modelling and simulation, systems biology, genetic epidemiology
        LS3 Cellular and Developmental Biology: cell biology, cell physiology, signal transduction, organogenesis, developmental genetics, pattern formation in plants and animals
        LS4 Physiology, Pathophysiology and Endocrinology: organ physiology, pathophysiology, endocrinology, metabolism, ageing, regeneration, tumorigenesis, cardiovascular disease, metabolic syndrome
        LS5 Neurosciences and neural disorders: neurobiology, neuroanatomy, neurophysiology, neurochemistry, neuropharmacology, neuroimaging, systems neuroscience, neurological disorders, psychiatry
        LS6 Immunity and infection: immunobiology, aetiology of immune disorders, microbiology, virology, parasitology, global and other infectious diseases, population dynamics of infectious diseases, veterinary medicine
        LS7 Diagnostic tools, therapies and public health: aetiology, diagnosis and treatment of disease, public health, epidem iology, pharmacology, clinical medicine, regenerative medicine, medical ethics
        LS8 Evolutionary, population and environmental biology: evolution, ecology, animal behaviour, population biology, biodiversity, biogeography, marine biology, eco-toxicology, prokaryotic biology
        LS9 Applied life sciences and biotechnology: agricultural, animal, fishery, forestry and food sciences; biotechnology, chemical biology, genetic engineering, synthetic biology, industrial biosciences; environmental biotechnology and remediation


        SH1_1 Macroeconomics, growth, business cycles
        SH1_2 Microeconomics, institutional economics
        SH1_3 Econometrics, statistical methods
        SH1_4 Financial markets, banking and corporate finance
        SH1_5 Competitiveness, innovation, research and development
        SH1_6 Consumer choice, behavioural economics, marketing
        SH1_7 Organization studies, strategy
        SH1_8 Human resource management, employment and earnings
        SH1_9 Public administration, public economics
        SH1_10 Income distribution, poverty
        SH1_11 International trade, economic geography
        SH1_12 Economic history, development
        SH2_1 Social structure, inequalities, social mobility
        SH2_2 Ageing, work, social policies
        SH2_3 Kinship, cultural dimensions of classification and cognition, individual and social identity, gender
        SH2_4 Myth, ritual, symbolic representations, religious studies
        SH2_5 Ethnography
        SH2_6 Globalization, migration, interethnic relations
        SH2_7 Transformation of societies, democratization, social movements
        SH2_8 Political systems, legitimacy of governance
        SH2_9 Legal systems, constitutions, foundations of law
        SH2_10 Private, public and social law
        SH2_11 Global and transnational governance, international law, human rights
        SH2_12 Communication networks, media, information society
        SH2_13 Social studies of science and technology, S&T policies, science and society
        SH2_14 History of science and technology
        SH3_1 Environment and sustainability
        SH3_2 Environmental regulation and mediation
        SH3_3 Social and industrial ecology
        SH3_4 Geographical information systems, cartography
        SH3_5 Human and social geography
        SH3_6 Spatial and regional planning
        SH3_7 Population dynamics
        SH3_8 Urbanization and urban planning, cities
        SH3_9 Mobility and transportation
        SH4_1 Evolution of mind and cognitive functions, animal communication
        SH4_2 Human life-span development
        SH4_3 Neuropsychology and cognitive psychology
        SH4_4 Clinical and experimental psychology,
        SH4_5 Formal, cognitive, functional and computational linguistics
        SH4_6 Typological, historical and comparative linguistics
        SH4_7 Acquisition and knowledge of language: psycholinguistics, neurolinguistics
        SH4_8 Use of language: pragmatics, sociolinguistics, discourse analysis
        SH4_9 second language teaching and learning, language pathologies, lexicography, terminology
        SH4_10 Philosophy, history of philosophy
        SH4_11 Epistemology, logic, philosophy of science
        SH4_12 Ethics and morality, bioethics
        SH4_13 Education: principles, techniques, typologies
        SH5_1 Classics
        SH5_2 History of literature
        SH5_3 Literary theory and comparative literature, literary styles
        SH5_4 Textual philology and palaeography
        SH5_5 Visual arts
        SH5_6 Performing arts
        SH5_7 Museums and exhibitions
        SH5_8 Numismatics, epigraphy
        SH5_9 Music and musicology, history of music
        SH5_10 History of art and architecture
        SH5_11 Cultural studies, cultural diversity
        SH5_12 Cultural memory, intangible cultural heritage
        SH6_1 Archaeology, archaeomet ry, landscape archaeology
        SH6_2 Prehistory and protohistory
        SH6_3 Ancient history, ancient cultures
        SH6_4 Medieval history
        SH6_5 Modern and contemporary history
        SH6_6 Colonial history, entangled histories, global history
        SH6_7 Military history,
        SH6_8 Historiography, theory and methods of history
        SH6_9 History of ideas, intellectual history
        SH6_10 Social, economic, cultural and political history
        SH6_11Collective memories, identities,lieux de mémoire, oral history
        SH6_12 Cultural heritage Mathematics, physical sciences, information and communication, engineering, universe and earth sciences

        PE1_2 Algebra
        PE1_3 Number theory
        PE1_4 Algebraic and complex geometry
        PE1_5 Geometry
        PE1_6 Topology
        PE1_7 Lie groups, Lie algebras
        PE1_8 Analysis
        PE1_9 Operator algebras and functional analysis
        PE1_10 ODE and dynamical systems
        PE1_11 Partial differential equations
        PE1_12 Mathematical physics
        PE1_13 Probability and statistics
        PE1_14 Combinatorics
        PE1_15 Mathematical aspects of computer science
        PE1_16 Numerical analysis and scientific computing
        PE1_17 Control theory and optimization
        PE1_18 Application of mathematics in sciences
        PE2_1 Fundamental interactions and fields
        PE2_2 Particle physics
        PE2_3 Nuclear physics
        PE2_4 Nuclear astrophysics
        PE2_5 Gas and plasma physics
        PE2_6 Electromagnetism
        PE2_7 Atomic, molecular physics
        PE2_8 Optics and quantum optics
        PE2_9 Lasers and laser physics
        PE2_10 Acoustics
        PE2_11 Relativity
        PE2_12 Classical physics
        PE2_13 Thermodynamics
        PE2_14 Non-linear physics
        PE2_15 General physics
        PE2_16 Metrology and measurement
        PE2_17 Statistical physics (gases)
        PE3_1 Structure of solids and liquids
        PE3_2 Mechanical and acoustical properties of condensed matter
        PE3_3 Thermal properties of condensed matter
        PE3_4 Transport properties of condensed matter,
        PE3_5 Electronic properties of materials and transport
        PE3_6 Lattice dynamics
        PE3_7 Semiconductors
        PE3_8 Superconductivity
        PE3_9 Superfluids
        PE3_10 Spintronics
        PE3_11 Magnetism
        PE3_12 Nanophysics: nanoelectronics, nanophotonics, nanomagnetism
        PE3_13 Mesoscopic physics
        PE3_14 Molecular electronics
        PE3_15 Soft condensed matter (liquid crystals...)
        PE3_16 Fluid dynamics (physics)
        PE3_17 Statistical physics (condensed matter)
        PE3_18 Phase transitions, phase equilibria
        PE3_19 Biophysics
        PE4_1 Physical chemistry
        PE4_2 Nanochemistry
        PE4_3 Spectroscopic and spectrometric techniques
        PE4_4 Molecular architecture and Structure
        PE4_5 Surface science
        PE4_6 Analytical chemistry
        PE4_7 Chemical physics
        PE4_8 Chemical instrumentation
        PE4_9 Electrochemistry, electrodialysis, microfluidics
        PE4_10 Combinatorial chemistry
        PE4_11 Method development in chemistry
        PE4_12 Catalysis
        PE4_13 Physical chemistry of biological systems
        PE4_14 Chemical reactions: mechanisms, dynamics, kinetics and catalytic reactions
        PE4_15 Theoretical and computational chemistry
        PE4_16 Radiation chemistry
        PE4_17 Nuclear chemistry
        PE4_18 Photochemistry
        PE5_1 Structural properties of materials
        PE5_2 Solid state materials
        PE5_3 Surface modification
        PE5_4 Thin films
        PE5_5 Corrosion
        PE5_6 Porous materials
        PE5_7 Ionic liquids
        PE5_8 New materials: oxides, alloys, composite, organic-inorganic hybrid, superconductors
        PE5_9 Materials for sensors
        PE5_10 Nanomaterials : nanoparticles, nanotubes
        PE5_11 Biomaterials synthesis
        PE5_12 Intelligent materials – self assembled materials
        PE5_13 Environment chemistry
        PE5_14 Coordination chemistry
        PE5_15 Colloid chemistry
        PE5_16 Biological chemistry
        PE5_17 Chemistry of condensed matter
        PE5_18 Homogeneous and heterogeneous catalysis
        PE5_19 Characterization methods of materials
        PE5_20 Macromolecular chemistry,
        PE5_21 Polymer chemistry
        PE5_22 Supramolecular chemistry
        PE5_23 Organic chemistry
        PE5_24 Molecular chemistry
        PE6_1 Computer architecture
        PE6_2 Database management
        PE6_3 Formal methods
        PE6_4 Graphics and image processing
        PE6_5 Human computer interaction and interface
        PE6_6 Informatics and information systems
        PE6_7 Theoretical computer science including quantum information
        PE6_8 Intelligent systems
        PE6_9 Scientific computing
        PE6_10 Modelling tools
        PE6_11 Multimedia
        PE6_12 Parallel and Distributed Computing
        PE6_13 Speech recognition
        PE6_14 Systems and software
        PE7_1 Control engineering
        PE7_2 Electrical and electronic engineering: semiconductors, components, systems
        PE7_4 Simulation engineering and modelling
        PE7_5 Systems engineering, sensorics, actorics, automation
        PE7_6 Micro- and nanoelectronics, optoelectronics
        PE7_7 Communication technology, high-frequency technology
        PE7_8 Signal processing
        PE7_9 Networks
        PE7_10 Man-machine-interfaces
        PE7_11 Robotics
        PE8_1 Aerospace engineering
        PE8_2 Chemical engineering, technical chemistry
        PE8_3 Civil engineering, maritime/hydraulic engineering, geotechnics, waste treatment
        PE8_4 Computational engineering
        PE8_5 Fluid mechanics, hydraulic-, turbo-, and piston engines
        PE8_6 Energy systems (production, distribution, application)
        PE8_7 Micro(system) engineering,
        PE8_8 Mechanical and manufacturing engineering (shaping, mounting, joining, separation)
        PE8_9 Materials engineering (biomaterials, metals, ceramics, polymers, composites, ...)
        PE8_10 Production technology, process engineering
        PE8_11 Product design, ergonomics, man-machine interfaces
        PE8_12 Lightweight construction, textile technology
        PE8_13 Industrial bioengineering
        PE8_14 Industrial biofuel production
        PE9_1 Solar and interplanetary physics
        PE9_2 Planetary systems sciences
        PE9_3 Interstellar medium
        PE9_4 Formation of stars and planets
        PE9_5 Astrobiology
        PE9_6 Stars and stellar systems
        PE9_7 The Galaxy
        PE9_8 Formation and evolution of galaxies
        PE9_9 Clusters of galaxies and large scale structures
        PE9_10 High energy and particles astronomy – X-rays, cosmic rays, gamma rays, neutrinos
        PE9_11 Relativistic astrophysics
        PE9_12 Dark matter, dark energy
        PE9_13 Gravitational astronomy
        PE9_14 Cosmology
        PE9_15 Space Sciences
        PE9_16 Very large data bases: archiving, handling and analysis
        PE9_17 Instrumentation - telescopes, detectors and techniques
        PE9_18 Solar planetology
        PE10_1 Atmospheric chemistry, atmospheric composition, air pollution
        PE10_2 Meteorology, atmospheric physics and dynamics
        PE10_3 Climatology and climate change
        PE10_4 Terrestrial ecology, land cover change,
        PE10_5 Geology, tectonics, volcanology,
        PE10_6 Paleoclimatology, paleoecology
        PE10_7 Physics of earth's interior, seismology, volcanology
        PE10_8 Oceanography (physical, chemical, biological)
        PE10_9 Biogeochemistry, biogeochemical cycles, environmental chemistry
        PE10_10 Mineralogy, petrology, igneous petrology, metamorphic petrology
        PE10_11 Geochemistry, crystal chemistry, isotope geochemistry, thermodynamics,
        PE10_13 Sedimentology, soil science, palaeontology, earth evolution
        PE10_14 Physical geography
        PE10_15 Earth observations from space/remote sensing
        PE10_16 Geomagnetism, paleomagnetism
        PE10_17 Ozone, upper atmosphere, ionosphere
        PE10_18 Hydrology, water and soil pollution


        LS1_1 Molecular biology and interactions
        LS1_2 General biochemistry and metabolism
        LS1_3 DNA biosynthesis, modification, repair and degradation
        LS1_4 RNA synthesis, processing, modification and degradation
        LS1_5 Protein synthesis, modification and turnover
        LS1_6 Biophysics
        LS1_7 Structural biology (crystallography, NMR, EM)
        LS1_8 Biochemistry of signal transduction
        LS2_1 Genomics, comparative genomics, functional genomics
        LS2_2 Transcriptomics
        LS2_3 Proteomics
        LS2_4 Metabolomics
        LS2_5 Glycomics
        LS2_6 Molecular genetics, reverse genetics and RNAi
        LS2_7 Quantitative genetics
        LS2_8 Epigenetics and gene regulation
        LS2_9 Genetic epidemiology
        LS2_10 Bioinformatics
        LS2_11 Computational biology
        LS2_12 Biostatistics
        LS2_13 Systems biology
        LS2_14 Biological systems analysis, modelling and simulation
        LS3_1 Morphology and functional imaging of cells
        LS3_2 Cell biology and molecular transport mechanisms
        LS3_3 Cell cycle and division
        LS3_4 Apoptosis
        LS3_5 Cell differentiation, physiology and dynamics
        LS3_6 Organelle biology
        LS3_7 Cell signalling and cellular interactions
        LS3_8 Signal transduction
        LS3_9 Development, developmental genetics, pattern formation and embryology in animals
        LS3_10 Development, developmental genetics, pattern formation and embryology in plants
        LS3_11 Cell genetics
        LS3_12 Stem cell biology
        LS4_1 Organ physiology
        LS4_2 Comparative physiology
        LS4_3 Endocrinology
        LS4_4 Ageing
        LS4_5 Metabolism, biological basis of metabolism related disorders
        LS4_6 Cancer and its biological basis
        LS4_7 Cardiovascular diseases
        LS4_8 Non-communicable diseases (except for neural/psychiatric, immunity-related, metabolism-related disorders, cancer and cardiovascular diseases)
        LS5_1 Neuroanatomy and neurosurgery
        LS5_2 Neurophysiology
        LS5_3 Neurochemistry and neuropharmacology
        LS5_4 Sensory systems (e.g. visual system, auditory system)
        LS5_5 Mechanisms of pain
        LS5_6 Developmental neurobiology
        LS5_7 Cognition (e.g. learning, memory, emotions, speech)
        LS5_8 Behavioral neuroscience (e.g. sleep, consciousness, handedness)
        LS5_9 Systems neuroscience
        LS5_10 Neuroimaging and computational neuroscience
        LS5_11 Neurological disorders (e.g. Alzheimer's disease, Huntington's disease, Parkinson's disease)
        LS5_12 Psychiatric disorders (e.g. schizophrenia, autism, Tourette's syndrome, obsessivecompulsive disorder, depression, bipolar disorder, attention deficit hyperactivity disorder)
        LS6_1 Innate immunity
        LS6_2 Adaptive immunity
        LS6_3 Phagocytosis and cellular immunity
        LS6_4 Immunosignalling
        LS6_5 Immunological memory and tolerance
        LS6_6 Immunogenetics
        LS6_7 Microbiology
        LS6_8 Virology
        LS6_9 Bacteriology
        LS6_10 Parasitology
        LS6_11 Prevention and treatment of infection by pathogens (e.g. vaccination, antibiotics, fungicide)
        LS6_12 Biological basis of immunity related disorders
        LS6_13 Veterinary medicine
        LS7_1 Medical engineering and technology
        LS7_2 Diagnostic tools (e.g. genetic, imaging)
        LS7_3 Pharmacology, pharmacogenomics, drug discovery and design, drug therapy
        LS7_4 Analgesia
        LS7_5 Toxicology
        LS7_6 Gene therapy, stem cell therapy, regenerative medicine
        LS7_7 Surgery
        LS7_8 Radiation therapy
        LS7_9 Health services, health care research
        LS7_10 Public health and epidemiology
        LS7_11 Environment and health risks including radiation
        LS7_12 Occupational medicine
        LS7_13 Medical ethics
        LS8_1 Ecology (theoretical, community, population, microbial, evolutionary ecology)
        LS8_2 Population biology, population dynamics, population genetics, plant-animal interactions
        LS8_3 Systems Evolution, biological adaptation, phylogenetics, systematics
        LS8_4 Biodiversity, comparative biology
        LS8_5 Conservation biology, ecology, genetics
        LS8_6 Biogeography
        LS8_7 Animal behaviour (behavioural ecology, animal communication)
        LS8_8 Environmental and marine biology
        LS8_9 Environmental toxicology
        LS8_10 Prokaryotic biology
        LS8_11 Symbiosis
        LS9_1 Genetic engineering, transgenic organisms, recombinant proteins, biosensors
        LS9_2 Synthetic biology and new bio-engineering concepts
        LS9_3 Agriculture related to animal husbandry, dairying, livestock raising
        LS9_4 Aquaculture, fisheries
        LS9_5 Agriculture related to crop production, soil biology and cultivation, applied plant biology
        """

    def nomenclature(self):
        dis = re.findall(r"[A-Z]+[0-9]+\s+.*", self.erc)
        subdis = re.findall(r"[A-Z]+[0-9]+_[0-9]+\s+.*", self.erc)

        return {
            'disciplines': [{'long': d, 'short': re.split(':|\s*\(', d)[0], 'code': d.split(' ')[0]} for d in dis],
            'subdisciplines': [{'long': d, 'short': re.split(':|\s*\(', d)[0], 'code': d.split(' ')[0]} for d in subdis],
        }

    def nomenclature_classee(self):
        nomenclature = self.nomenclature()
        disciplines = nomenclature['disciplines']
        for d in disciplines:
            d['subdisciplines'] = []
            for s in nomenclature['subdisciplines']:
                if s['code'].startswith(d['code']):
                    d['subdisciplines'].append(s)

        return disciplines

    def nomenclature_fil(self, suffix, roles, color):
        nomenclature = self.nomenclature()
        disciplines = [[d['short'], '%s%s' % (suffix, d['code']), roles, color] for d in nomenclature['disciplines']]
        subdisciplines = [[d['short'], '%s%s' % (suffix, d['code']), roles, color] for d in nomenclature['subdisciplines']]

        return {
            'disciplines': disciplines,
            'subdisciplines': subdisciplines,
        }

    def nomenclature_codes(self):
        nomenclature = self.nomenclature()
        codes = {}
        for d in nomenclature['disciplines']:
            codes[d['code']] = d
        for s in nomenclature['subdisciplines']:
            codes[s['code']] = s

        return codes

if __name__ == "__main__":
    erc = ERC()
    pp.pprint(erc.nomenclature_codes())
    # pp.pprint(erc.nomenclature_fil('#UCANomenclatureERC', ['admin', 'gest_uca'], 'color3'))
