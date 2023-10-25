import unittest
import time
from appium import webdriver
from appium.webdriver.common.appiumby import AppiumBy
from appium.options.android import UiAutomator2Options

capabilities = dict(
    platformName='Android',
    automationName='uiautomator2',
    deviceName='Pixel3A',
    appPackage='com.agonzalez22umg.apptest',
    appActivity='.MainActivity',
    language='en',
    locale='US'
)

appium_server_url = 'http://localhost:4723'

# Converts capabilities to AppiumOptions instance
capabilities_options = UiAutomator2Options().load_capabilities(capabilities)

class TestAppium(unittest.TestCase):

    @classmethod
    def setUpClass(self) -> None:
        self.driver = webdriver.Remote(
            command_executor=appium_server_url,
            options=capabilities_options
        )

    @classmethod
    def tearDownClass(self):
        time.sleep(5)
        if self.driver:
            self.driver.quit()


    def test_1_save_empty_user(self):
        el = self.driver.find_element(by=AppiumBy.XPATH, value='//*[@text="CREAR USUARIO"]')
        el.click()

        # guardar campos vacios
        el = self.driver.find_element(by=AppiumBy.XPATH, value='//*[@text="SAVE USER"]')
        el.click()

        # aceptar alerta
        self.driver.implicitly_wait(1.5)
        el24 = self.driver.find_element(by=AppiumBy.ID, value="android:id/button1")
        el24.click()

        # navegar hacia arriba.
        self.driver.implicitly_wait(1.5)
        el25 = self.driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Navigate up")
        el25.click()


    def test_2_save_user(self):
        btn_create = self.driver.find_element(by=AppiumBy.XPATH, value='//*[@text="CREAR USUARIO"]')
        btn_create.click()

        text_fields = self.driver.find_elements(by=AppiumBy.XPATH, value='//android.widget.EditText')
        data = ["Manuel Miguel", "miguemi5@gmail.com", "50203030"]

        for id, text_field in enumerate(text_fields):
            text_field.click()
            text_field.send_keys(data[id])

        btn_save = self.driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="SAVE USER")
        btn_save.click()
        btn_save.click()


    def test_3_delete_user(self):
        usr_btn = self.driver.find_element(by=AppiumBy.XPATH, value="(//android.view.ViewGroup[@resource-id=\"padView\"])[2]")
        usr_btn.click()

        btn_del = self.driver.find_element(by=AppiumBy.XPATH, value='//*[@text="DELETE"]')
        btn_del.click()

        confirm_btn = self.driver.find_element(by=AppiumBy.ID, value="android:id/button2")
        confirm_btn.click()

    def test_4_update_user(self):
        usr_btn = self.driver.find_element(by=AppiumBy.XPATH, value="(//android.view.ViewGroup[@resource-id=\"padView\"])[1]")
        usr_btn.click()

        text_fields = self.driver.find_elements(by=AppiumBy.XPATH, value='//android.widget.EditText')
        data = ["Raúl Botzic", "raul@gmail.com", "49203030"]

        for id, text_field in enumerate(text_fields):
            text_field.click()
            text_field.send_keys(data[id])

        update_btn = self.driver.find_element(by=AppiumBy.XPATH, value='//*[@text="UPDATE"]')
        update_btn.click()
        update_btn.click()


if __name__ == '__main__':
    unittest.main()
