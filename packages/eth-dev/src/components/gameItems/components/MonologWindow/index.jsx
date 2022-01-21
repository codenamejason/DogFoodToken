import React from 'react'
import { connectController } from './controller'
import { DialogContainer } from './components'
import { WindowModal } from '..'

const MonologWindow = ({
  isVisible,
  levelContainer: { currentLevel },
  dialog,
  actions,
  globalGameActions,
  ...props
}) => {
  return (
    <WindowModal
      initTop={0}
      initLeft={0}
      initHeight={300}
      initWidth={450}
      backgroundPath=''
      dragAreaHeightPercent={25}
      isOpen={isVisible}
    >
      <DialogContainer
        currentLevel={currentLevel}
        dialog={dialog}
        actions={actions}
        globalGameActions={globalGameActions}
        parentProps={{ ...props }}
      />
    </WindowModal>
  )
}

export default connectController(MonologWindow)
