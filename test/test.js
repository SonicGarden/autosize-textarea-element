describe('custom-element', function () {
  describe('element creation', function () {
    it('creates from document.createElement', function () {
      const el = document.createElement('autosize-textarea')
      assert.equal('AUTOSIZE-TEXTAREA', el.nodeName)
    })

    it('creates from constructor', function () {
      const el = new window.AutosizeTextarea()
      assert.equal('AUTOSIZE-TEXTAREA', el.nodeName)
    })
  })

  describe('after tree insertion', function () {
    beforeEach(function () {
      document.body.innerHTML = `
        <autosize-textarea></autosize-textarea>
      `
    })

    afterEach(function () {
      document.body.innerHTML = ''
    })

    it('initiates', function () {
      const ce = document.querySelector('autosize-textarea')
      assert.equal(ce.textContent, '')
    })
  })
})
