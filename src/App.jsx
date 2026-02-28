import React, { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import ToolSelector from './components/ToolSelector'
import SettingsPanel from './components/SettingsPanel'
import ProcessingState from './components/ProcessingState'
import ResultsPanel from './components/ResultsPanel'
import HowItWorks from './components/HowItWorks'
import CompareTable from './components/CompareTable'
import FAQ from './components/FAQ'
import Footer from './components/Footer'
import UrlModal from './components/UrlModal'
import NoiseFilter from './components/NoiseFilter'
import { useCompression } from './hooks/useCompression.js'
import './styles/globals.css'

export default function App() {
  // ── File selection ──────────────────────────────────────────────────────
  const [files, setFiles] = useState([])

  // ── Tool / settings state ───────────────────────────────────────────────
  const [activeTab, setActiveTab] = useState('pdf')
  const [mode, setMode] = useState('smart')
  const [quality, setQuality] = useState(65)
  const [targetSize, setTargetSize] = useState('')      // KB string or ''
  const [outputFormat, setOutputFormat] = useState('same')
  const [grayscale, setGrayscale] = useState(false)
  const [preserveMeta, setPreserveMeta] = useState(false)
  const [password, setPassword] = useState('')

  // ── Modal state ─────────────────────────────────────────────────────────
  const [urlModalOpen, setUrlModalOpen] = useState(false)

  // ── Real compression hook ───────────────────────────────────────────────
  const {
    phase,
    progress,
    currentFile,
    logMessage,
    results,
    error,
    compress,
    cancel,
    reset: resetCompression,
  } = useCompression()

  // Map hook phase → legacy appState naming used by child components
  const appState = phase === 'idle' ? 'idle'
    : phase === 'processing' ? 'processing'
      : phase === 'done' ? 'results'
        : phase === 'error' ? 'results'   // show results panel with error cards
          : 'idle'

  // ── Handlers ────────────────────────────────────────────────────────────
  const handleFilesSelected = (newFiles) => {
    setFiles(prev => [...prev, ...newFiles])
  }

  const handleRemoveFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleCompress = () => {
    if (files.length === 0) return

    // Resolve targetBytes from the targetSize input (KB string → bytes)
    let targetBytes = null
    if (targetSize && Number(targetSize) > 0) {
      targetBytes = Number(targetSize) * 1024
    }

    compress(files, {
      quality,
      mode,
      targetBytes,
      outputFormat,
      grayscale,
      preserveMeta,
      password,
    })
  }

  const handleCancel = () => {
    cancel()
  }

  const handleReset = () => {
    setFiles([])
    setPassword('')
    resetCompression()
  }

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="app">
      <NoiseFilter />
      <div className="grain-overlay" aria-hidden="true" />

      <Header />

      <main>
        {/* ── Upload zone (idle only) */}
        {appState === 'idle' && (
          <Hero
            files={files}
            onFilesSelected={handleFilesSelected}
            onRemoveFile={handleRemoveFile}
            onUrlModalOpen={() => setUrlModalOpen(true)}
          />
        )}

        {/* ── Processing screen */}
        {appState === 'processing' && (
          <ProcessingState
            filename={currentFile || files[0]?.name || 'file'}
            progress={progress}
            logMessage={logMessage}
            onCancel={handleCancel}
          />
        )}

        {/* ── Results screen */}
        {appState === 'results' && (
          <ResultsPanel
            results={results}
            onReset={handleReset}
          />
        )}

        {/* ── Tool selector + settings (always show except during processing) */}
        {appState !== 'processing' && (
          <>
            <ToolSelector activeTab={activeTab} onTabChange={setActiveTab} />
            <SettingsPanel
              mode={mode}
              onModeChange={setMode}
              quality={quality}
              onQualityChange={setQuality}
              targetSize={targetSize}
              onTargetSizeChange={setTargetSize}
              outputFormat={outputFormat}
              onOutputFormatChange={setOutputFormat}
              grayscale={grayscale}
              onGrayscaleChange={setGrayscale}
              preserveMeta={preserveMeta}
              onPreserveMetaChange={setPreserveMeta}
              onCompress={handleCompress}
              hasFiles={files.length > 0}
            />
          </>
        )}

        {/* ── Static content sections */}
        <HowItWorks />
        <CompareTable />
        <FAQ />
      </main>

      <Footer />

      {/* ── URL import modal */}
      {urlModalOpen && (
        <UrlModal
          onClose={() => setUrlModalOpen(false)}
          onImport={(newFile) => {
            setFiles(prev => [...prev, newFile])
            setUrlModalOpen(false)
          }}
        />
      )}
    </div>
  )
}
